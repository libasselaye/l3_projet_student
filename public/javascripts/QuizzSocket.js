/**
 * Socket example.
 * Essentially for client socket communications.
 */
var phase = 0;

class QuizzSocket {
    constructor(canvas) {
        // Reference on the drawing canvas
        this.canvas = canvas;
        // Socket communications
        this.socket = io();
        this.socket.emit("register");
        this.socket.on("update_players", (data) => {
            if (data) {
                canvas.updateWaiting(data);
            }
        });
        this.socket.on("status_start_game", (data) => {
            if (data == "good") {
                this.playGame();
            } else if (data == "bad") {
                // La partie n'a pas pu démarrer
            }
        });
        this.socket.on("push_question_to_monitor", (data) => {
            if (phase != data["phase"]) {
                console.log("nouvelle phase");
                phase++;
                setTimeout(canvas.drawQuestion(data), 3000);
            } else {
                canvas.drawQuestion(data);
            }
        });
        this.socket.on("timer_step", (data) => {
            // console.log(data);
            canvas.updateProgressBar(data);
        });
        this.socket.on("timer_step_timeout", (data) => {
            console.log("Fin");
        });
        this.socket.on("push_correct_response", (data) => {
            console.log(data);
            setTimeout(this.playGame(), 3000);
        });
    }

    playGame() {
        this.socket.emit("play_game");
    }

    startGame() {
        this.socket.emit("start_game");
    }
}
