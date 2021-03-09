const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;

const API_URL = '/api/v1';

const featuredNews = [];
const users = [];
const games = [];

const dataFile = (file) => {
  return require(path.join(__dirname, `stub/${file}.json`));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get(`${API_URL}/featured-news`, (req, res) => {
  res.json(dataFile('featured-news'));
});

app.get(`${API_URL}/users`, (req, res) => {
  res.json(dataFile('users'));
});

// app.post(`${API_URL}/users`, (req, res) => {
//   const user = req.body.user;
//   console.log('Adding user::::::::', user);
//   users.push(user);
//   res.json('user addedd');
// });

app.get(`${API_URL}/games`, (req, res) => {
  res.json(dataFile('games'));
});

// app.post(`${API_URL}/games`, (req, res) => {
//   const game = req.body.game;
//   console.log('Adding game::::::::', game);
//   games.push(game);
//   res.json('user addedd');
// });

app.get(`${API_URL}/navigation`, (req, res) => {
  res.json(dataFile('navigation'));
});

app.get('/', (req, res) => {
  res.send('The server is running.');
});

app.listen(port, () => {
  console.log(`Server listening on the port ${port}.`);
});
