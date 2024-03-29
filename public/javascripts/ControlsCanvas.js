/**
 * Canvas drawing example.
 * Essentially for drawing functions.
 */

class ControlsCanvas {
    constructor() {}

    afterRegister() {
        document.getElementById("pageOne").setAttribute("hidden", "hidden");
        document.getElementById("pageTwo").removeAttribute("hidden");
        document.getElementById("pageThree").setAttribute("hidden", "hidden");
    }

    drawTimeOut() {
        let myButtons = document.getElementsByClassName("response");
        if (myButtons) {
            for (let i = 0; i < myButtons.length; i++) {
                myButtons[i].disabled = true;
            }
        }
        let submitButton = document.getElementById("responseFormSubmit");
        if (submitButton) submitButton.disabled = true;
    }

    drawPullOutOneProposal(response) {
        let myButtons = document.getElementsByClassName("response");
        if (myButtons) {
            for (let i = 0; i < myButtons.length; i++) {
                if (myButtons[i].innerText != response) {
                    myButtons[i].disabled = true;
                    return;
                }
            }
        }
    }

    drawPublicProposal(data) {
        document.getElementById("responseStatus").innerHTML =
            "Proposition: " + data;
        document
            .getElementById("responseStatus")
            .setAttribute("class", "text-info");
    }

    playerResponseStatus(data) {
        if (data > 0) {
            document.getElementById("responseStatus").innerHTML =
                "Bonne réponse";
            document
                .getElementById("responseStatus")
                .setAttribute("class", "text-success");
        } else {
            document.getElementById("responseStatus").innerHTML =
                "Mauvaise réponse";
            document
                .getElementById("responseStatus")
                .setAttribute("class", "text-danger");
        }
    }

    drawProposals(data, controlsSocket) {
        if (data === undefined || data["proposals"] === undefined) return;
        let content = "";
        document.getElementById("responseStatus").removeAttribute("class");
        document.getElementById("responseStatus").innerHTML = "";
        if (data["proposals"].length > 0) {
            for (let i = 0; i < data["proposals"].length; i++) {
                content +=
                    '<div class="row my-2">\
                <div class="col-8 offset-2">\
                    <button\
                        class=" btn-lg btn-block response"\
                    >\
                        <span class="h5">' +
                    data["proposals"][i] +
                    "</span>\
                    </button>\
                </div>\
            </div>";
            }
        } else {
            document.getElementById("Joker2").setAttribute("hidden", "hidden");
            document.getElementById("Joker3").setAttribute("hidden", "hidden");
            content =
                '<form class="justify-content-center">\
            <div class="form-row">\
                <div class="col-md-6 offset-md-2 col-8">\
                    <input\
                        type="text"\
                        class="form-control"\
                        id="phase3Response"\
                        placeholder="Entrez une valeur"\
                    />\
                </div>\
                <div class="col-md-4 col-4">\
                    <button\
                        type="submit"\
                        class="btn btn-outline"\
                        id="responseFormSubmit"\
                    >\
                        Valider\
                    </button>\
                </div>\
            </div>\
        </form>';
        }

        document.getElementById("proposals").innerHTML = content;
        if (document.getElementById("pageThree").getAttribute("hidden")) {
            document.getElementById("pageOne").setAttribute("hidden", "hidden");
            document.getElementById("pageTwo").setAttribute("hidden", "hidden");
            document.getElementById("pageThree").removeAttribute("hidden");
        }
        ControlsEvents.updateControlsEvents(controlsSocket);
    }
}
