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

server.post('/api/users', (req, res) => {

  if (!req.body.name || !req.body.bio) {
    res.status(400).json( { errorMessage: "Please provide name and bio for the user." } );
    res.end();
  }
  else {
  
    const userData = req.body;

    db.insert(userData)
      .then( id => {
        res.status(201).json(id);
      })
      .catch( () => {
        res.status(500).json( { errorMessage: "There was an error while saving the user to the database" } )
      })
  }
})

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then( user => {
      if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
      else {
        if (!req.body.name || !req.body.bio) {
          res.status(400).json( { errorMessage: "Please provide name and bio for the user." } );
          // res.end();
        }
        else {
          const userData = req.body;
          db.update(id, userData)
            .then( () => {
              res.status(200).json('Successfully updated.');
            })
            .catch( () => {
              res.status(500).json( { errorMessage: "The user information could not be modified." } );
            })
        }
      }
  })
})

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then( user => {
      if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist."} );
      }
      else {
        db.remove(id)
          .then ( deleted => {
            res.status(200).json(deleted);
          })
          .catch( () => {
            res.status(500).json( { errorMessage: "The user could not be removed" } );
          })
      }
    })
})



const port = 5000;

server.listen(port, () => console.log(`\n ** API on port ${port} ** \n`))