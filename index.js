// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send({hello: 'Afternoon Project!'});
})

server.get('/api/users', (req, res) => {
  db.find()
    .then( users => {
      res.status(200).json(users);
    })
    .catch( () => {
      res.status(500).json( {errorMessage: 'The users information could not be retrieved.'} )
    })
})

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  db.findById(id)
    .then( user => {
      console.log('user: ', user);
      if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
      else {
        res.status(200).json(user)
      }
    })
    .catch( () => {
      res.status(500).json( { errorMessage: "The user information could not be retrieved." } );
    })
})

const port = 5000;

server.listen(port, () => console.log(`\n ** API on port ${port} ** \n`));