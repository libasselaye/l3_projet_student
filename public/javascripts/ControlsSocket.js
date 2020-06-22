"use strict";

/**
 * Socket example.
 * Essentially for client socket communications.
 */

class ControlsSocket {
    constructor() {
        this.socket = io();
    }

    register(playerPseudo) {
        this.socket.emit("register", { pseudo: playerPseudo });
    }

    reponse() {
        this.socket.emit("reponse");
    }
}
