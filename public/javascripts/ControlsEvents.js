"use strict";
/**
 * DOM and events example.
 * Essentially for client DOM and events.
 */

class ControlsEvents {
  constructor(socket) {
    // Reference on the socket
    this.socket = socket;
    // DOM elements
    this.pseudo = document.querySelector('#pseudo').nodeValue;
    this.button = document.querySelector('#entrer');

    // DOM events
    this.button.onclick = (event) => this.onClicksignin(event);
    
  }

  onClicksignin(event) {
    this.socket.signin();
    console.log(this.pseudo);
  }

  onClickjoker(event) {
    //this.socket.reponse();
    console.log('Yes ca marche joker');
  }

}
