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


// adding message.js from utils
const formatMessage = require('./utils/message');

// adding users,js from utils
const {userJoin, getCurrentUser, userleave, getRoomUsers} = require('./utils/users');



// adding socket.io
const socketio = require('socket.io');
const { join } = require('path');
// run when client connects
const io = socketio(server);
io.on('connection', socket => {
    //console.log(`new ws connection on...`);

    // catching client's displayname and room
    socket.on('joinRoom',({displayname, room})=>{

        const user = userJoin(socket.id, displayname, room);

        socket.join(user.room);


        // only for the connected user
        socket.emit('message', formatMessage('Bot','Welcome to the Chat !!!'));

        // broadcast to all except the connected user when someone connects
        socket.broadcast
        .to(user.room)
        .emit('message', formatMessage('Bot',`${user.displayname} has joined the Chat !`));


    });


    // broadcast to all user
    //io.emit();


    // listen the chatMessage and emit to all users in the room
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.displayname,msg));
    });


    // when someone disconnects
    socket.on('disconnect',() => {
        const user = userleave(socket.id);
        if(user){
            io.to(user.room).emit('message',formatMessage('Bot',`${user.displayname} left the Chat. :(`));
        }
    });

});
