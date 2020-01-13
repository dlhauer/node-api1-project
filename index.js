// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send({hello: 'Afternoon Project!'});
})

const port = 5000;

server.listen(port, () => console.log(`\n ** API on port ${port} ** \n`));