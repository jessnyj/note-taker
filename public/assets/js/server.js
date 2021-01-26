// dependencies
const express = require('express');
const path = require('path');

// set up express
const app = express();
const PORT = process.env.PORT || 3000;

// handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// notes array
var notes = [];


// routes/redirects
// index.html
// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// notes.html
// app.get("/notes", function (req, res) {
//     res.sendFile(path.join(__dirname, 'public', 'notes.html'));
// });

// api notes
app.get('/api/notes', (req, res) => {
    return res.json(notes);
});

// post api/notes
app.post('/api/notes', (req, res) => {
    var newNote = req.body;
    console.log(newNote);
    if (notes.length < 5) {
        notes.push(newNote);
        res.send("Note")
    } else {
        notes.push(newNote);
        res.send();
    }
});

// api/delete/note
app.delete("/api/notes/:id", (req, res) => {
    var index = req.body.index;
    var temp = [];
    for (var i = 0; i < notes.length; i++) {
        if (i !== parseInt(index)) {
            temp.push(notes[i]);
        }
    }
    notes = temp;
    res.send("note removed")
});

// start server
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT)
})