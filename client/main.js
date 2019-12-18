const socket = io();


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('room').onsubmit = (e) => {
    e.preventDefault();
    socket.emit('set username', e.target.elements[0].value);
    }
    socket.on('new user', (name) => {
        document.getElementById('username').innerHTML = name;
    })
});

socket.on('system new', (name) => {
    document.getElementById('messages').innerHTML += `${name} joined!`
})
