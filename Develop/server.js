const express = require('express');
const path = require('path');
const notes = require('./public/db/notes')
const uuid = require('./public/helpers/uuid');
const fs = require('fs');
const { readFromFile, readAndAppend } = require('./public/helpers/fsUtils');

const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
); 

app.get('/db', (req, res) =>{
console.info(`${req.method} request received to get notes`);

// Sending all notes to the client
return res.json(notes);
});

app.get('/api/notes', (req, res) => {
// ^ this brings back the db file in json
console.info(`${req.method} request received to get notes`);
readFromFile('./public/db/notes.json').then((data) => res.json(JSON.parse(data)));

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  // ^brings you to main page when any unknown path is put in
  
// app.get('/db', (req, res) => {
//   console.info(`${req.method} request received to get notes`);
//   return res.json(notes)
// });
// ^brings back notes when db path is requested
 

app.post('/api/notes', (req, res) => {
    // Let the client know that their POST request was received
    console.info(`${req.method} request received to add a note`);
    
  const { title, text} = req.body;

  // Check if there is anything in the response body
  if (text && title) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/notes.json');   

    const response = {
      status: 'success',
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  }else{
    res.status(400).json(`error in saving note`);
  }
});
   


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


