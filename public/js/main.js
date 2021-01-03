
const socket = io();

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

});


// defination of outputMessage
function outputMessage(message){
    //document.getElementById('showChatMessage').innerHTML += `${message}<br>`;
    document.querySelector('.messages').innerHTML += `${message}<br>`;
}