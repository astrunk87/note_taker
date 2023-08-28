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




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

// ^pulled from student work
