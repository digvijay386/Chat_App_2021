// setting up express server
const express = require('express');

const app = express();

const http = require('http');

const server = http.createServer(app);

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));


// adding public folder
const path = require('path');

app.use(express.static(path.join(__dirname,'public')));


// adding socket.io
const socketio = require('socket.io');
// run when client connects
const io = socketio(server);
io.on('connection', socket => {
    //console.log(`new ws connection on...`);

    // only for the connected user
    socket.emit('message', 'welcome to chatapp');

    // broadcast to all except the connected user when someone connects
    socket.broadcast.emit('message', 'new user joined');

    // broadcast to all user
    //io.emit();

    // when someone disconnects
    socket.on('disconnect',() => {
        io.emit('message','someone left the chat');
    });



});

