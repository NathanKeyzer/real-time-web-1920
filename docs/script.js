$(function () {
  var socket = io();
  $('form.username').submit(function(e){
          e.preventDefault(); // prevents page reloading
          socket.emit('new user', $('#username').val());
          return false;
        });
  $('form').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

const name = prompt ('whats is your name?')
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('server message', function(msg){
    $('#messages').append($('<li class="server-message">').text(msg));
  });


});
