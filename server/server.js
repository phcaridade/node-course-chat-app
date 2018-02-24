const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicpath = path.join(__dirname, '..',  'public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicpath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', ()=>{
        console.log('Client disconnected');
    });
});


var s = server.listen(port, () => {
    var host = s.address().address
    var port = s.address().port
    console.log(`Server is up at ${host} port ${port}`);
});
