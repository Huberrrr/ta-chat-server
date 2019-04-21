const express = require('express');
const app = express();
const router = require('./routes');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', handleConnection);

function handleConnection(socket) {
    console.log("user connected: " + socket.id);

    socket.on('disconnect', handleDisconnect)

    socket.on('message', message =>{
        console.log(message);
        socket.broadcast.emit('message',message);
    });


}

function handleDisconnect(socket) {
    console.log("user disconnected");
}


app.use('/', router);

const port = 5000;
server.listen(process.env.PORT || port, () => {
    console.log('server is now onine...');
});


