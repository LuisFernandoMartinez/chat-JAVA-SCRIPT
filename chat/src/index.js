const http= require('http');
const express = require('express');
const socketio=require('socket.io');

const path=require('path');
const app=express();
const server= http.createServer(app);
const io= socketio.listen(server);

const mongoose= require('mongoose');

// coneccion databse
mongoose.connect('mongodb://localhost/chat-database')
  .then(db=> console.log('db is connect'))
  .catch(err=> console.log(err))

app.set('port', process.env.PORT || 3000 )
require('./sockets')(io);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port'),()=>{
    console.log('server on the port 3000');
} )


