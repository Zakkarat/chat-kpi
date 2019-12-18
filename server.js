const express = require('express');
const http = require('http');

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(server);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.use(express.static('./client'));

io.on('connection', (socket) => {
  socket.on('set username', (username) => {
    socket.username = username;
    socket.broadcast.emit('system new', socket.username);
  })
  socket.on('message', (message) => {
    const data = {
      username: socket.username,
      message
    }
    io.emit('render message', data)
  })
})

server.listen(port, () => {
  console.log('listening on *:' + port);
});
