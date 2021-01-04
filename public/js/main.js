// getting query info from qs functionalities
const {displayname, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


const socket = io();
 
// sending displayname and room of user to server
socket.emit('joinRoom',{displayname, room});

socket.on('message', message => {
    console.log(message);

    // this function is defined below. used for printing chat msg.
    outputMessage(message);

    // scroll to the bottom
    document.querySelector('.messages').scrollTop = document.querySelector('.messages').scrollHeight;
});


// chat.html
const chatForm = document.getElementById('messageForm');
// message retrieval on submission
chatForm.addEventListener('submit', (e) => {

    e.preventDefault();

    // collecting chat msg from the form
    const msg = e.target.elements.messagebox.value;
    //console.log(msg);

    // emiting msg to the server
    socket.emit('chatMessage',msg);

    // empty the msg input after sending the msg
    e.target.elements.messagebox.value = '';
    e.target.elements.messagebox.focus();

});


// defination of outputMessage
function outputMessage(message){
    //document.getElementById('showChatMessage').innerHTML += `${message}<br>`;
    document.querySelector('.messages').innerHTML += `<div class='messages'><b>${message.username} ${message.time} :</b> ${message.text}</div>`;
}