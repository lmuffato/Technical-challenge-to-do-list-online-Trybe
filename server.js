const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

app.use(cors());
app.use(bodyParser.json());

const io = require('socket.io')(http, {
  cors: {
    orgin: 'http://localhost:3000',
    method: ['GET', 'POST', 'DELETE'],
  },
});

require('dotenv').config();

PORT= process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '/front-end')));

require('./back-end/sockets/taskListSocket')(io);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/front-end/taskList.html'));
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});