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
<<<<<<< HEAD
        // this.answerbutton = document.querySelector(".answerSubmit");

        // DOM events
        this.button.onclick = (event) => this.onSendPseudo(event);
        // if (this.answerbutton) {
        //     this.answerbutton.onclick = (event) => this.onReceiveAnswer(event);
        // }

        let myButtons = document.getElementsByClassName("answerSubmit");
        // for (let i = 0; i < myButtons.length; i++) {
        //     myButtons[i].addEventListener("click", function (e) {
        //         e.preventDefault();
        //         console.log(e.target.innerText);
        //     });
        // }
=======
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
>>>>>>> 8f8d013975a60c468b20c98878551d0d8348cd92
    }

    onSendPseudo(event) {
        event.preventDefault();
        let p = document.querySelector("#pseudo").value;
        this.socket.register(p);
        document.querySelector("#pseudo").value = "";
        this.canvas.afterRegister();
    }
    // onReceiveAnswer(event) {
    //     event.preventDefault();
    //     // console.log(event.currentTarget.value);
    //     console.log(event.target.value);
    // }

    onClickResponse(event) {
        console.log(event.target.innerText);
    }

    onClickjoker(event) {
        //this.socket.reponse();
        console.log("Yes ca marche joker");
    }
}
