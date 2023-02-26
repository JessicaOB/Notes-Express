const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
let notes = require('./db/db.json');
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));
const ROOT = { root: path.join(__dirname, './public') };

// route for notes page
app.get('/notes', (req, res) => {
    // res.sendFile(path.join(__dirname, '/public/notes.html'))
    res.sendFile("notes.html", ROOT);
});

//route to get notes by reading db.json
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

//route to post notes by giving it an id and adding it to db.json
app.post('/api/notes', (req, res) => {
    let newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    };
    console.log(notes);
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    res.json(notes);
});

// route for homepage or errors
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//start server
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
