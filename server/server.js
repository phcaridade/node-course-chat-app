const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

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

    /*
    socket.emit('newMessage', {
        from: 'John',
        text: "See you then",
        createdAt: 123123
    });
    */

    socket.on('createMessage', (message)=>{
        console.log('createMessage', message);
      
        io.emit('newMessage', generateMessage( message.from, message.text));
        
        /*
       socket.broadcast.emit('newMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
        });
        */
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
