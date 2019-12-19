const socket = io();


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('room').onsubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements[0].value;
    e.target.elements[0].value = '';
    socket.emit('set username', username)
    document.getElementById('username').innerHTML = username;
    }
    document.getElementById('messageForm').onsubmit = (e) => {
        e.preventDefault();
        socket.emit('message', e.target.elements[0].value)
        e.target.elements[0].value = '';
    }
    document.getElementById('toHistory').onclick = async() => {
        fetch('/db').then(response => {
            if(response.ok) {
                return response.json();
            }
        }).then(data => {
            const box = document.getElementById('messages');
            box.innerText = '';
            data.forEach(elem => {
                box.innerText += `[${elem.username}]: ${elem.message}`
            });
        })
    }
});

socket.on('system new', (name) => {
    document.getElementById('messages').innerText += `${name} joined! \n`
})

socket.on('render message', (data) => {
    document.getElementById('messages').innerText += `[${data.username}]: ${data.message} \n`
})