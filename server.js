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
io.on('connection', (socket)=>{
    console.log('a user is connected');
    socket.emit('add user', users)
    socket.on('userTile', (user)=>{
        users.push(user)
        console.log(users);
        socket.broadcast.emit('another user connected', user)
    })

})




http.listen(process.env.PORT || 3000);
