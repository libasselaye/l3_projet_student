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

        if (this.buttonResponse) {
            this.button.onclick = (event) => this.onSendPhase3Response(event);
        }

        // Event for joker buttons
        let buttonjoker = document.getElementsByClassName("joker");
        for (let i = 0; i < buttonjoker.length; i++) {
            buttonjoker[i].addEventListener(
                "click",
                this.onClickJoker.bind(this)
            );
        }
    }

    static updateControlsEvents(controlsSocket) {
        // Event for response buttons
        let myResponseButtons = document.getElementsByClassName("response");
        if (myResponseButtons) {
            for (let i = 0; i < myResponseButtons.length; i++) {
                myResponseButtons[i].addEventListener("click", function (e) {
                    e.preventDefault();
                    for (let j = 0; j < myResponseButtons.length; j++) {
                        myResponseButtons[j].disabled = true;
                    }
                    controlsSocket.sendPlayerResponse(e.target.innerText);
                });
            }
        }
        let responseSubmitButton = document.getElementById(
            "responseFormSubmit"
        );
        if (responseSubmitButton) {
            responseSubmitButton.addEventListener("click", function (e) {
                e.preventDefault();
                let p = document.querySelector("#phase3Response").value;
                document.getElementById("responseFormSubmit").disabled = true;
                // document.querySelector("#phase3Response").value = "";
                console.log(p);
                this.socket.sendPlayerResponse(p);
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

    onClickJoker(event) {
        event.preventDefault();
        if (ControlsEvents.classExist(event.target, "disabled-image") == 1) {
            return;
        }

        let rep = confirm(
            "Voulez-vraiment utiliser ce joker? Tout les jokers sont utilisables qu'une seule fois"
        );
        if (rep == false) {
            return;
        }

        ControlsEvents.addClass(event.target, "disabled-image");

        this.socket.jokerChoiceEvents(event.target.getAttribute("id"));

        console.log("Yes ca marche joker");
    }

    static addClass(element, myClass) {
        var arr;
        arr = element.className.split(" ");
        if (arr.indexOf(myClass) == -1) {
            element.className += " " + myClass;
        }
    }

    static classExist(element, mclassName) {
        var arr;
        arr = element.className.split(" ");
        if (arr.indexOf(mclassName) == -1) {
            // element.className += " " + mclassName;
            return 0; // la classe n'existe pas
        } else {
            return 1; // la classe existe
        }
    }
}
