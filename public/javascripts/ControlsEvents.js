"use strict";

/**
 * DOM and events example.
 * Essentially for client DOM and events.
 */

class ControlsEvents {
    constructor(socket, canvas) {
        // Reference on the socket
        this.socket = socket;
        this.canvas = canvas;
        this.button = document.querySelector("#pseudoFormSubmit");

        // DOM events
        this.button.onclick = (event) => this.onSendPseudo(event);
    }

    onSendPseudo(event) {
        event.preventDefault();
        let p = document.querySelector("#pseudo").value;
        this.socket.register(p);
        document.querySelector("#pseudo").value = "";
        this.canvas.afterRegister();
    }

    onClickjoker(event) {
        //this.socket.reponse();
        console.log("Yes ca marche joker");
    }
}
