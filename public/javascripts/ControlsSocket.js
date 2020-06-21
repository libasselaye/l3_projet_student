"use strict";

/**
 * Socket example.
 * Essentially for client socket communications.
 */

class ControlsSocket {
  constructor() {
    this.socket = io();
   // this.socket.emit('register');
  }

  signin() {
    this.socket.emit('sign_in');
    this.socket.emit('pseudo' , this.pseudo);
  }

  reponse() {
    this.socket.emit('reponse');
  }
}

