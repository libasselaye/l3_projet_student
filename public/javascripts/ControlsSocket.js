"use strict";

/**
 * Socket example.
 * Essentially for client socket communications.
 */

class ControlsSocket {
    constructor(canvas) {
        this.socket = io();
        this.canvas = canvas;
        this.publicChoice = "";
        this.response = "";
        this.socket.on("push_proposals_to_controls", (data) => {
            if (data) {
                this.publicChoice =
                    data["proposals"][
                        ControlsSocket.randomInt(
                            0,
                            data["proposals"].length - 1
                        )
                    ];

                this.response = data["response"];
                canvas.drawProposals(data, this);
            }
        });
        this.socket.on("player_response_status", (data) => {
            canvas.playerResponseStatus(data);
        });
        this.socket.on("timer_step_timeout", (data) => {
            // Eviter que les joueurs appuient sur un bouton
            canvas.drawTimeOut();
        });
    }

    sendPlayerResponse(data) {
        this.socket.emit("send_player_response", { response: data });
    }

    jokerChoiceEvents(data) {
        this.socket.emit("send_joker_choice", { joker: data });
        if (data == "Joker2") {
            // Joker 2
            console.log(this.publicChoice);
            this.canvas.drawPublicProposal(this.publicChoice);
        } else if (data == "Joker3") {
            // Joker 3
            this.canvas.drawPullOutOneProposal(this.response);
        }
        console.log(data);
    }

    register(playerPseudo) {
        this.socket.emit("register", { pseudo: playerPseudo });
    }

    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
