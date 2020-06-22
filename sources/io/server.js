"use strict";

const Quizz = require("../engine/Quizz");

const quizz = new Quizz();

const ImportSock = require("../../public/javascripts/ControlsEvents");

/**
 * Socket.io server.
 */

const socketio = require("socket.io");

function io(server) {
    const io = socketio(server);

    io.on("connection", function (socket) {
        socket.on("register", (data) => {
            if (quizz.register(socket.id, data["pseudo"])) {
                io.emit("update_players", quizz.getPlayers());
            }
        });

        socket.on("disconnect", () => {
            quizz.removePlayer(socket.id);
            io.emit("update_players", Object.values(quizz.players.values()));
        });
    });

    // setInterval(() => {
    //     const data = {
    //         message: "Server update !",
    //         players: Object.values(quizz.players),
    //     };
    //     io.volatile.emit("update", data);
    // }, 1000 / 25); // ~25 FPS
}

module.exports = io;
