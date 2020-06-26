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
            if (t == 4) {
                document
                    .getElementById("waitingPlayersSpan")
                    .setAttribute("hidden", "hidden");
            } else {
                document
                    .getElementById("waitingPlayersSpan")
                    .removeAttribute("hidden");
            }
        }
    }

    updateProgressBar(data) {
        if (data == undefined) return;
        let progress = document.getElementById("timeProgress");
        if (progress) {
            progress.setAttribute("aria-valuenow", data);
            progress.setAttribute("style", "width: " + data + "%");
            progress.innerText = data / 5 + "sec";
        }
    }

    drawQuestion(data) {
        if (document.getElementById("pageTwo").getAttribute("hidden")) {
            document.querySelector("#pageOne").setAttribute("hidden", "hidden");
            document
                .querySelector("#pageThree")
                .setAttribute("hidden", "hidden");
            document
                .querySelector("#pageFour")
                .setAttribute("hidden", "hidden");
            document.getElementById("pageTwo").removeAttribute("hidden");
        }
        document.getElementById("questionValue").innerHTML = data["question"];
        document.getElementById("responseValue").innerHTML = "";
    }

    updateAnswer(data) {
        document.getElementById("responseValue").innerHTML = data;
    }

    updatePlayerZone(data) {
        // Player Score Zone
        let contentValue = "";
        for (var i = 0; i < data.length; i++) {
            contentValue +=
                '<td class="text-center"><em class="fa fa-user fa-2x text-' +
                data[i]["color"] +
                '"></em>\
            <div><small>' +
                data[i]["pseudo"] +
                '</small></div>\
            <div class="display-5"><strong>' +
                data[i]["score"] +
                "</strong></div>\
        </td>";
        }
        let tabScores = document.getElementsByClassName("tabScore");
        if (tabScores) {
            for (var i = 0; i < tabScores.length; i++) {
                tabScores[i].innerHTML = contentValue;
            }
        }
    }

    drawFinalPage(data) {
        if (document.getElementById("pageFour").getAttribute("hidden")) {
            document.querySelector("#pageOne").setAttribute("hidden", "hidden");
            document.querySelector("#pageTwo").setAttribute("hidden", "hidden");
            document
                .querySelector("#pageThree")
                .setAttribute("hidden", "hidden");
            document.getElementById("pageFour").removeAttribute("hidden");
        }
        if (data[0]["score"] != data[1]["score"]) {
            document.getElementById("winner").innerText = data[0]["pseudo"];
            document
                .getElementById("winnerLabel")
                .setAttribute("hidden", "hidden");
        }

        this.updatePlayerZone();
    }
}
