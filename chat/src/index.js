const http= require('http');
const express = require('express');
const socketio=require('socket.io');

const path=require('path');
const app=express();
const server= http.createServer(app);
const io= socketio.listen(server);


app.set('port', process.env.PORT || 3000 )
require('./sockets')(io);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port'),()=>{
    console.log('server on the port 3000');
} )


