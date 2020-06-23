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
                    <em class="fa fa-user fa-4x text-secondary"></em>\
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
        document.getElementById("mainContent").innerHTML =
            '<div class="row mt-1 mb-3">\
        <div class="col-md-8 offset-md-2">\
            <div class="shadow-lg rounded" id="question-area">\
                <div class="row my-5">\
                    <div class="col-md-3 align-self-center">\
                        <div class="text-center">\
                            <img src="../images/rob.png" alt="robot" class="img-fluid" alt="Responsive image" >\
                        </div>\
                    </div>\
                    <div class="col-md-9">\
                        <h2 class="display-5">' +
            data["question"] +
            '</h2>\
                    </div>\
                </div>\
                <div class="row">\
                    <div class="col-md-12">\
                        <div class="progress">\
                            <div\
                                class="progress-bar progress-bar-striped progress-bar-animated bg-primary"\
                                role="progressbar"\
                                aria-valuenow="0"\
                                aria-valuemin="0"\
                                aria-valuemax="100"\
                                style="width: 0%;"\
                                id="timeProgress"\
                            ></div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>';
    }
}
