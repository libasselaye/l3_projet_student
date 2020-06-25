"use strict";

/**
 * DOM and events example.
 * Essentially for client DOM and events.
 */

class QuizzEvents {
    constructor(socket) {
        // Reference on the socket
        this.socket = socket;
        this.button = document.querySelector("#playGame");
        this.buttonNewGame = document.querySelector("#startNewGame");
        if (this.buttonNewGame) {
            this.buttonNewGame.onclick = (event) => this.onStartGame(event);
        }

        if (this.button) {
            this.button.onclick = (event) => this.onPlayGame(event);
        }

        document.addEventListener("keydown", function (event) {
            if (event.ctrlKey && event.key === "m") {
                event.preventDefault();
                console.log("Redémarrer");
                socket.initGame();
            }
        });
    }

    onStartGame(event) {
        event.preventDefault();
        this.socket.initGame();
        window.location.href = "/monitor";
    }

    onPlayGame(e) {
        document.querySelector("#pageOne").setAttribute("hidden", "hidden");
        document.querySelector("#pageTwo").setAttribute("hidden", "hidden");
        document.querySelector("#pageThree").removeAttribute("hidden");
        this.socket.startGame();
    }
}
