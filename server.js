const express = require("express");
const path = require("path");
const notes = require("./db/notes.json");
const uuid = require("uuid");
const fs = require("fs");
const { readFromFile, readAndAppend, writeToFile } = require("./helpers/fsUtils");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/db", (req, res) => {
  console.info(`${req.method} request received to get notes`);

  // Sending all notes to the client
  return res.json(notes);
});

app.get("/api/notes", (req, res) => {
  // ^ this brings back the db file in json
  console.info(`${req.method} request received to get notes`);
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// ^brings you to main page when any unknown path is put in



app.post("/api/notes", (req, res) => {
  // Let the client know that their POST request was received
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  // Check if there is anything in the response body
  if (text && title) {
    const newNote = {
      title,
      text,
      id: uuid.v4(),
      // fixed with help form tutor, id namedidnt match what the front end was using
    };

    readAndAppend(newNote, "./db/notes.json");

    const response = {
      status: "success",
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(400).json(`error in saving note`);
  }
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const updatedNotes = notes.filter((note) => note.id !== id)
    writeToFile("./db/notes.json", updatedNotes );
    res.status(200).json("note deleted")
})
// ^ with help from tutor


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
