/**
 * Canvas drawing example.
 * Essentially for drawing functions.
 */

class QuizzCanvas {
    constructor() {}

    updateWaiting(players) {
        let classValues = ["primary", "success", "warning", "danger"];
        let nodeWaitingPlayers = document.querySelector("#waitingPlayers");
        let t = players.length;
        nodeWaitingPlayers.innerHTML = "";
        for (var i = 0; i < 4; i++) {
            if (i < t) {
                nodeWaitingPlayers.innerHTML +=
                    '<td class="text-center">\
                    <em class="fa fa-user fa-4x text-' +
                    classValues[i] +
                    '"></em>\
                    <div class="display-6"><em>' +
                    players[i]["pseudo"] +
                    "</em></div></td>";
            } else {
                nodeWaitingPlayers.innerHTML +=
                    '<td class="text-center">\
                    <em class="fa fa-user fa-4x text-secondary"></em>\
                    <div class="display-6"><em></em></div>\
                </td>';
            }
        }
        if (t >= 2 && t <= 4) {
            document.querySelector("#homePlayButton").innerHTML =
                '<button type="button" class="btn btn-primary btn-lg btn_jouer">Allez Jouer!  </button>';
        }
    }
}
