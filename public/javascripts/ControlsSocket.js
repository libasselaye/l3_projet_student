"use strict";

/**
 * Socket example.
 * Essentially for client socket communications.
 */

class ControlsSocket {
    constructor(canvas) {
        this.socket = io();
        this.canvas = canvas;
        this.socket.on("push_proposals_to_controls", (data) => {
            if (data) {
                canvas.drawProposals(data);
            }
        });
    }

    register(playerPseudo) {
        this.socket.emit("register", { pseudo: playerPseudo });
    }

    reponse() {
        this.socket.emit("reponse");
    }
}
