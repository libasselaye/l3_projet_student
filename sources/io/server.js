'use strict'

/**
 * Socket.io server. 
 */

const socketio = require('socket.io');

function io(server) {
  
  const io = socketio(server);

  io.on('connection', function(socket) {
    // TODO
  });

}

module.exports = io;
