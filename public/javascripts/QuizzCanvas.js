/**
 * Canvas drawing example.
 * Essentially for drawing functions.
 */

class QuizzCanvas {
    constructor() {}

    updateWaiting(players) {
        // let classValues = ["primary", "success", "warning", "danger"];
        let nodeWaitingPlayers = document.querySelector("#waitingPlayers");
        let t = players.length;
        nodeWaitingPlayers.innerHTML = "";
        for (var i = 0; i < 4; i++) {
            if (i < t) {
                nodeWaitingPlayers.innerHTML +=
                    '<td class="text-center">\
                    <em class="fa fa-user fa-4x text-' +
                    players[i]["color"] +
                    '"></em>\
                    <div class="display-6"><em>' +
                    players[i]["pseudo"] +
                    "</em></div></td>";
            } else {
                nodeWaitingPlayers.innerHTML +=
                    '<td class="text-center">\
                    <em class="fa fa-user fa-4x text-white"></em>\
                    <div class="display-6"><em></em></div>\
                </td>';
            }
        }
        if (t >= 2 && t <= 4) {
            document.getElementById("playGame").disabled = false;
        }
    }

    updateProgressBar(data) {
        if (data == undefined) return;
        let progress = document.getElementById("timeProgress");
        if (progress) {
            progress.setAttribute("aria-valuenow", data);
            progress.setAttribute("style", "width: " + data + "%");
        }
    }

    drawQuestion(data) {
        if (document.getElementById("pageTwo").getAttribute("hidden")) {
            document.querySelector("#pageOne").setAttribute("hidden", "hidden");
            document
                .querySelector("#pageThree")
                .setAttribute("hidden", "hidden");
            document.getElementById("pageTwo").removeAttribute("hidden");
        }
        document.getElementById("questionValue").innerHTML = data["question"];
        document.getElementById("responseValue").innerHTML = "";
    }

    updateAnswer(data) {
        document.getElementById("responseValue").innerHTML = data;
        // document.getElementById("responseDiv").removeAttribute("hidden");
    }

    updatePlayerZone(data) {
        // Player Score Zone
        let contentValue = "";
        for (var i = 0; i < data.length; i++) {
            contentValue +=
                '<td class="text-center"><em class="fa fa-user fa-4x text-' +
                data[i]["color"] +
                '"></em>\
            <div class="display-6"><em>' +
                data[i]["pseudo"] +
                '</em></div>\
            <div class="display-5"><strong>' +
                data[i]["score"] +
                "</strong></div>\
        </td>";
        }

        document.getElementById("tabScore").innerHTML = contentValue;
    }
}
