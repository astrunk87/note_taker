const express = require('express');
const path = require('path');
const notes = require('./db/notes')
const uuid = require('./db/uuid');

const app = express();
const PORT = 3001;

app.use(express.json());
// app.use(express.static('public'));
// ^this caused all my post problems :(
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/notes.html'))
);

// app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/db', (req, res) =>{
console.info(`${req.method} request received to get notes`);

// Sending all notes to the client
return res.json(notes);
});

app.get('/api/notes', (req, res) => {
// ^ this brings back the db file in json
console.info(`${req.method} request received to get notes`);

  // Sending all notes to the client
  return res.json(notes);
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
    console.info(`${req.method} request received to add a review`);
    
  let response;

  // Check if there is anything in the response body
  if (req.body && req.body.title) {
    response = {
      status: 'success',
      data: req.body,
      title: req.body.title,
      text: req.body.text
    };
    res.json(`Note title:${response.title}. Note text:${response.text}`);
  } else {
    res.json('Request body must at least contain note title');
  }

  // Log the response body to the console
  console.log(req.body);

  });

  app.get('/api/notes', (req, res) => {
    console.info(`GET /api/notes`);
    res.status(200).db.json(data);
  });

  


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


