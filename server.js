const express = require('express')
const app = express()
const path = require ('path')
const port = 3000
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cookieParser = require('cookie-parser');
require('dotenv').config();


const index = require('./routes/index')
const loginRoute =  require('./routes/login');
const callbackRoute =  require('./routes/callback');
const room = require('./routes/room');

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'docs')))
app.use(cookieParser());


app.get('/', index);
app.get('/login', loginRoute);
app.get('/callback', callbackRoute);
app.get('/room', room);

const users = [];
const genres= [];
io.on('connection', (socket)=>{
    console.log('a user is connected');
    socket.emit('add user', users)
    socket.emit('add genre', genres)
    //broadcast when a user connects
    socket.broadcast.emit('add user', 'a user is connected to this room')

    socket.on('userTile', (user)=>{
        users.push(user)
        console.log(users);
        console.log(user);
        socket.broadcast.emit('another user connected', user)
    })
    socket.on('allGenres',(userGenre)=>{
        genres.push(userGenre)
        socket.broadcast.emit('new genre', userGenre)
    })
    //when a user disconnect
    socket.on('disconnect', ()=>{
        io.emit('add user', 'a user has left the room');

    })
})


http.listen(process.env.PORT || 3000);
