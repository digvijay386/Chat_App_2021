
const socket = io();


socket.on('message', message => {
    console.log(message);
})


// chat.html
const chatForm = document.getElementById('messageForm');
// message retrieval on submission
chatForm.addEventListener('submit', (e) =>{
    
    e.preventDefault();

    const msg = e.target.elements.messagebox.value;
    console.log(msg);

});