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
    let userName = 'onbekend';
    console.log(`${userName} is verbonden`);

    socket.emit('server message', `Welkom in de chat, kies een gebruikersnaam..`);
    socket.broadcast.emit('server message', `Gebruiker ${userName} verbonden.`);

    socket.on('new user', function(id){
        const oldUsername = userName;
        userName = id;
        console.log(`${userName}`);
        socket.emit('server message', `U gebruikersnaam is veranderd in ${userName}.`);
        socket.broadcast.emit('server message', `Gebruiker ${oldUsername} heeft zijn naam veranderd in ${userName}.`);

    })

    socket.on('disconnect', function() {
        console.log(`user ${userName} disconnected`);
        io.emit('server message', `Gebruiker ${userName} heeft de chat verlaten`)
    });

    socket.on('chat message', function(msg){
        io.emit('chat message',`${userName}: ${msg}`);
  });
});


http.listen(process.env.PORT || 3000);
