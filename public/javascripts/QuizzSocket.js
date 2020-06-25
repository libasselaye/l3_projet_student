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
            canvas.drawQuestion(data);
        });
        this.socket.on("new_phase", (data) => {
            if (data !== undefined) {
                if (data == -1) {
                    // Demander une question
                    this.getQuestion(0);
                    // this.getPlayersScore();
                } else if (data == -2) {
                    this.socket.emit("get_final_score");
                } else if (data > 0) {
                    setTimeout(this.getQuestion.bind(this, 1), 500);
                }
            }
        });

        this.socket.on("sort_final_score", (data) => {
            canvas.drawFinalPage(data);
        });

        this.socket.on("timer_step", (data) => {
            canvas.updateProgressBar(data);
        });

        this.socket.on("push_correct_response", (data) => {
            canvas.updateAnswer(data);
            this.getPlayersScore();
            setTimeout(this.playGame.bind(this), 5000);
        });
        this.socket.on("players_score", (data) => {
            canvas.updatePlayerZone(data);
        });
    }

    getQuestion(data) {
        this.socket.emit("send_question");
        if (data == 1) this.getPlayersScore();
    }

    playGame() {
        this.socket.emit("play_game");
    }

    startGame() {
        this.socket.emit("start_game");
    }

    initGame() {
        this.socket.emit("init_game");
    }

    getPlayersScore() {
        this.socket.emit("send_players_score");
    }
}
