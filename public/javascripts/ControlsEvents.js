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
        if (this.button) {
            // DOM events
            this.button.onclick = (event) => this.onSendPseudo(event);
        }
    }

    static updateControlsEvents(controlsSocket) {
        let myResponseButtons = document.getElementsByClassName("response");
        for (let i = 0; i < myResponseButtons.length; i++) {
            myResponseButtons[i].addEventListener("click", function (e) {
                e.preventDefault();
                controlsSocket.sendPlayerResponse(e.target.innerText);
            });
        }
    }

    onSendPseudo(event) {
        event.preventDefault();
        let p = document.querySelector("#pseudo").value;
        this.socket.register(p);
        document.querySelector("#pseudo").value = "";
        this.canvas.afterRegister();
    }

    onClickResponse(event) {
        console.log(event.target.innerText);
    }

    onClickjoker(event) {
        //this.socket.reponse();
        console.log("Yes ca marche joker");
    }
}
