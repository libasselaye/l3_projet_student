"use strict";

const Quizz = require("../engine/Quizz");

const quizz = new Quizz();

const ImportSock = require("../../public/javascripts/ControlsEvents");

/**
 * Socket.io server.
 */

const socketio = require("socket.io");
const Helper = require("../Helper");

function io(server) {
    const io = socketio(server);

    io.on("connection", function (socket) {
        socket.on("register", (data) => {
            if (quizz.register(socket.id, data["pseudo"])) {
                io.emit("update_players", quizz.getPlayers());
            }
        });

        socket.on("start_game", () => {
            quizz.start().then(function (data) {
                if (data) {
                    io.emit("status_start_game", "good");
                    console.log("Success started");
                } else {
                    io.emit("status_start_game", "bad");
                }
            });
        });

        socket.on("play_game", () => {
            quizz.play().then(function (data) {
                if (data == 1) {
                    io.emit("push_question_to_monitor", {
                        question: quizz.printQuestion(),
                        phase: quizz.counterPhase,
                    });

                    io.emit("push_proposals_to_controls", {
                        proposals:
                            quizz.counterPhase == 3
                                ? []
                                : Helper.shuffle(quizz.printResponse()),
                        phase: quizz.counterPhase,
                    });

                    quizz.step = 0;
                    quizz.timer = setInterval(function () {
                        if (quizz.step < 100) {
                            quizz.step += 5;
                            io.emit("timer_step", quizz.step);
                        } else {
                            quizz.step = 0;
                            io.emit("timer_step_timeout");
                            // envoyer au moniteur que le delai est dépassé
                            quizz.playersResponse = {};
                            io.emit(
                                "push_correct_response",
                                quizz.displayCorrectResponse()
                            );
                            // Effacer le timer en cours
                            clearInterval(quizz.timer);
                        }
                    }, 1200);
                } else if (data == 0) {
                    // Partie terminée
                }
            });
        });

        socket.on("disconnect", () => {
            quizz.removePlayer(socket.id);
            io.emit("update_players", Object.values(quizz.players.values()));
        });
    });
}

module.exports = io;
