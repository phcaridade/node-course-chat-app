const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicpath = path.join(__dirname, '..',  'public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicpath));

io.on('connection', (socket) => {
    console.log('New user connected');


    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the ChatApp'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined...'));

    socket.on('createMessage', (message, callback)=>{
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage( message.from, message.text));
        callback('This is from the server.');       
    });

    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', ()=>{
        console.log('Client disconnected');
    });
});


var s = server.listen(port, () => {
    var host = s.address().address
    var port = s.address().port
    console.log(`Server is up at ${host} port ${port}`);
});
