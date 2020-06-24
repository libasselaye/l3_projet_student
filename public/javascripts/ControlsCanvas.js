/**
 * Canvas drawing example.
 * Essentially for drawing functions.
 */

class ControlsCanvas {
    constructor() {}

    afterRegister() {
        document.querySelector("#controlsContent").innerHTML =
            "<h2>En attente...</h2>";
    }

    drawProposals(data, controlsSocket) {
        if (data === undefined || data["proposals"] === undefined) return;
        let content =
            '<div class="row my-4">\
        <div class="col-4 offset-4">\
            <img src="../images/logo.png" alt="logo" class="img-fluid" />\
        </div>\
    </div>';
        for (let i = 0; i < data["proposals"].length; i++) {
            content +=
                '<div class="row my-4">\
        <div class="col-8 offset-2">\
            <button class="btn btn-primary btn-lg btn-block response">\
                <span class="h1">' +
                data["proposals"][i] +
                "</span>\
            </button>\
        </div>\
    </div>";
        }

        content +=
            '<div class="row my-4">\
        <div class="col-8 px-5 offset-2">\
            <div class="d-flex justify-content-between">\
                <div class="col-4">\
                    <img\
                        class="rounded-circle"\
                        width="60"\
                        height="60"\
                        src="../images/joker1.png"\
                    />\
                </div>\
                <div class="col-4">\
                    <img\
                        class="rounded-circle"\
                        width="60"\
                        height="60"\
                        src="../images/joker2.png"\
                    />\
                </div>\
                <div class="col-4">\
                    <img\
                        class="rounded-circle"\
                        width="60"\
                        height="60"\
                        src="../images/joker3.png"\
                    />\
                </div>\
            </div>\
        </div>\
    </div>';
        document.getElementById("controlsContent").innerHTML = content;
        ControlsEvents.updateControlsEvents(controlsSocket);
    }
}
