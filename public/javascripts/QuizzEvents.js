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
        if (this.button) {
            this.button.onclick = (event) => this.onPlayGame(event);
        }
    }

    onPlayGame(e) {
        document.querySelector("#mainContent").innerHTML =
            '<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>';
        this.socket.startGame();
    }
}
