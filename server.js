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

     let userName = '';
    console.log(`${userName} a user is connected`);

    socket.on('disconnect', function() {
        console.log(`user ${userName} disconnected`);
        io.emit('server message', `User with username ${userName} disconnected`)
    });

    socket.on('new user', function(id){
        const oldUsername = userName;
        userName = id;
        console.log(`${userName}`);
        socket.emit('server message', `Your username was changed to ${userName}.`);
        socket.broadcast.emit('server message', `User ${oldUsername} changed their name to ${userName}.`);

    })


    socket.emit('server message', `Welcome to the chat pick a username`);
    socket.broadcast.emit('server message', `User ${userName} connected.`);

    socket.on('chat message', function(msg){
        io.emit('chat message',`${userName}: ${msg}`);
  });
});


http.listen(process.env.PORT || 3000);
