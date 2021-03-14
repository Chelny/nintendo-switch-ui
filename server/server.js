const path = require('path');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;

const API_URL = '/api/v1';

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

app.get(`${API_URL}/games`, (req, res) => {
  res.json(dataFile('games'));
});

app.get(`${API_URL}/navigation`, (req, res) => {
  res.json(dataFile('navigation'));
});

app.get('/', (req, res) => {
  res.send('The server is running.');
});

app.listen(port, () => {
  console.log(`Server listening on the port ${port}.`);
});
