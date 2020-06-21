/**
 * Socket example.
 * Essentially for client socket communications.
 */

class QuizzSocket {
    constructor(canvas) {
        // Reference on the drawing canvas
        this.canvas = canvas;
        // Socket communications
        this.socket = io();
        //this.socket.on('update', (data) => this.canvas.redraw(data));
        //this.socket.on('update' , ()=> console.log('Je vous recois Mr Serveur'));
        this.socket.on("update_players", (data) => {
            console.log(data);
            if (data) {
                canvas.updateWaiting(data);
            }
        });
    }
}
