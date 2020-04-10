$(function () {
  var socket = io();
  $('form.username').submit(function(e){
          e.preventDefault(); // prevents page reloading
          socket.emit('set user', $('#username').val());
          return false;
        });
  $('form').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('server message', function(msg){
    $('#messages').append($('<li class="server-message">').text(msg));
  });


});
