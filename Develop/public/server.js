const express = require('express');
const path = require('path');
const data = require('./db/db.json')

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

// app.get('/db', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/db.json'))
// );

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
app.get('/db', (req, res) => res.json(data));

app.post('/db', (req, res) => {
    // Let the client know that their POST request was received
    res.json(`${req.method} request received`);
  

    let response;

    // Check if there is anything in the response body
    if (req.body && req.body.product) {
      response = {
        status: 'success',
        data: req.body,
      };
      res.status(201).json(response);
    } else {
      res.status(400).json('Request body must at least contain something');
    }
  
    // Log the response body to the console
    console.log(req.body);
  });


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

// ^pulled from student work
