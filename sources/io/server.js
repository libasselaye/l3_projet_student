'use strict'

const ImportQuizz = require('../engine/Quizz');

const quizz = new ImportQuizz('quizz');

const ImportSock = require('../../public/javascripts/ControlsEvents');


/**
 * Socket.io server. 
 */

const socketio = require('socket.io');

function io(server) {
  
  const io = socketio(server);

  io.on('connection', function(socket) {

      socket.on('sign_in', () => {
          //quizz.register(socket.id,socket.pseudo);
          console.log("nouveau joueur");
          console.log("Bienvenue " + pseudo );
      });
      /*socket.on('recup', function (pseudo) {

        console.log("Bienvenue " + pseudo );

      });*/
    
    socket.on('disconnect', () => quizz.remove_player(socket.pseudo));
    
  });
 
  setInterval(() => {
    const data = {
      message: 'Server update !',
      players: Object.values(quizz.players)
    };
    io.volatile.emit('update', data);
  }, 1000 / 25); // ~25 FPS

}

module.exports = io;
