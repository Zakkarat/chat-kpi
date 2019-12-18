const socket = io();


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('room').onsubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements[0].value;
    socket.emit('set username', username)
    document.getElementById('username').innerHTML = username;
    }
});

socket.on('system new', (name) => {
    document.getElementById('messages').innerHTML += `${name} joined!`
})
