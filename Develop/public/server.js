const express = require('express');
const path = require('path');
const notes = require('./db/notes')
const uuid = require('./db/uuid');

const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/index.html'))
);

app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

// app.get('/db', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/db.json'))
// );

app.get('/api/notes', (req, res) => res.json(notes));
// ^ this brings back the db file in json

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
app.get('/db', (req, res) => res.json(notes));


app.post('/api/notes', (req, res) => {
    // Let the client know that their POST request was received
    console.info(`${req.method} request received to add a review`);

    const { title, text} = req.body;

    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
     
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
    }
  });

  app.get('/api/notes', (req, res) => {
    console.info(`GET /api/notes`);
    res.status(200).db.json(data);
  });

  


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


