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

// app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

// app.get('/db', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/db.json'))
// );

app.get('/api/notes', (req, res) => {
// ^ this brings back the db file in json
console.info(`${req.method} request received to get reviews`);

  // Sending all reviews to the client
  return res.json(notes);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  // ^brings back html file when any unknown path is put in
  
app.get('/db', (req, res) => res.json(notes));
// ^brings back notes when db path is requested


app.post('/api/notes', (req, res) => {
    // Let the client know that their POST request was received
    console.info(`${req.method} request received to add a review`);
    // res.json(`${req.method} request received to add a review`);

  // // Log our request to the terminal
  // console.info(`${req.method} request received to add a review`);

  let response;

  // Check if there is anything in the response body
  if (req.body && req.body.title) {
    response = {
      status: 'success',
      data: req.body,
      title: req.body.title,
      text: req.body.text
    };
    res.json(`Note for ${response.title} has been added!`);
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


