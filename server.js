const express = require('express')
const app = express()
const path = require ('path')
const port = 3000
const http = require('http').Server(app);
const io = require('socket.io')(http);



app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'docs')))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/docs/index.html');
});


io.on('connection', function(socket){

     const userName = 'newuser';
    console.log(`${userName} a user is connected`);

    socket.on('disconnect', function() {
        console.log(`user${userName} disconnected`);
        io.emit('server message', `SERVER: User with username ${userName} disconnected`)
    });


    socket.emit('server message', `SERVER: Welcome to the chat ${userName}`);
    socket.broadcast.emit('server message', `SERVER: User ${userName} connected.`);

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
