const socket = io('http://localhost:8000');

const form = document.getElementById('chatForm');
const chapInput = document.getElementById('chatInput');
const messageContainer = document.querySelector('.container');
var audio = new Audio('./assets/ting.mp3')

append = (message, position) => {
    const joinChat = document.createElement('div');
    joinChat.innerHTML = message;
    joinChat.classList.add('message')
    joinChat.classList.add(position)
    messageContainer.append(joinChat)
    if (position === 'right') audio.play()
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const chat = chapInput.value;
    append(`You: ${chat}`, 'left')
    socket.emit('send', chat)
    chapInput.value = ''
})

const name = prompt('Enter your name to join.');
socket.emit('new-user-joined', name)

socket.on('user-joined', name => {
    append(`${name} have joined chat.`, 'right')
}) 

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'right')
}) 
socket.on('leave', name => {
    append(`${name}: have left the chat.`, 'right')
}) 