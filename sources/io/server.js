"use strict";

const Quizz = require("../engine/Quizz");

var quizz = new Quizz();

const ImportSock = require("../../public/javascripts/ControlsEvents");

/**
 * Socket.io server.
 */

const socketio = require("socket.io");
const helper = require("../Helper.js");
const Helper = helper.Helper;
const Joker = helper.Joker;

function io(server) {
    const io = socketio(server);

    io.on("connection", function (socket) {
        socket.on("init_game", () => {
            quizz = new Quizz();
        });
        socket.on("register", (data) => {
            if (!data) {
                io.emit("update_players", quizz.getPlayers());
            } else {
                if (quizz.register(socket.id, data["pseudo"])) {
                    io.emit("update_players", quizz.getPlayers());
                }
            }
        });

        io.on("get_final_score", () => {
            io.emit("sort_final_score", quizz.sortPlayersByScore());
        });

        socket.on("send_player_response", (data) => {
            let status = quizz.checkResponse(socket.id, data["response"]);
            if (status == 1) {
                socket.emit("player_response_status", 1); // pour bonne réponse
            } else if (status == 10) {
                socket.emit("player_response_status", 10); // pour bonne réponse
                clearInterval(quizz.timer);
                io.emit(
                    "push_correct_response",
                    quizz.displayCorrectResponse()
                );
                // Faire appel à la play pour une nouvelle question
            } else if (status == -1) {
                socket.emit("player_response_status", -1); // pour mauvaise réponse
            } else if (status == 0) {
                socket.emit("player_response_status", -10); // pour mauvaise réponse et plus de possibilité de réponse
                clearInterval(quizz.timer);
                io.emit(
                    "push_correct_response",
                    quizz.displayCorrectResponse()
                );
            } else {
                console.log("T'as déjà répondu");
            }
            io.emit("players_score", quizz.getPlayers());
        });

        socket.on("send_joker_choice", (data) => {
            if ((data["joker"] = "Joker1")) {
                quizz.activeJoker(socket.id, Joker.INCREASE_REWARD);
            } else {
                quizz.activeJoker(
                    socket.id,
                    data["joker"] == "Joker2"
                        ? Joker.PUBLIC_NOTICE
                        : Joker.DELETE_ONE
                );
                quizz.deactiveJoker(
                    socket.id,
                    data["joker"] == "Joker2"
                        ? Joker.PUBLIC_NOTICE
                        : Joker.DELETE_ONE
                );
            }
        });

        socket.on("send_players_score", () => {
            io.emit("players_score", quizz.getPlayers());
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

        socket.on("send_question", () => {
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
                response: quizz.currentPhase.currentQuestion.answer,
            });

            quizz.step = 0;
            quizz.timer = setInterval(function () {
                if (quizz.step < 100) {
                    quizz.step += 5;
                    io.emit("timer_step", quizz.step);
                } else {
                    quizz.step = 0;
                    io.emit("timer_step_timeout");
                    io.emit(
                        "push_correct_response",
                        quizz.displayCorrectResponse()
                    );
                    // Effacer le timer en cours
                    clearInterval(quizz.timer);
                }
            }, 1200);
        });

        /**
         * -1 si partie et phase en cours
         * -2 si partie terminée
         * nombre positif si nouvelle phase
         */
        socket.on("play_game", () => {
            quizz.play().then(function (data) {
                if (data == 1) {
                    io.emit("new_phase", quizz.counterPhase);
                } else if (data == 2) {
                    // Question actualisée
                    io.emit("new_phase", -1);
                } else if (data == 0) {
                    // Partie terminée
                    io.emit("new_phase", -2);
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
