// dependencies
var express = require("express");
var path = require("path")

// set up express
var app = express();
var PORT = process.env.PORT || 3000;

// handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// note and new notes arrays
var notes = [];
var newNote = [];

// routes/redirects
// index.html
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

// api notes
app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

// post api/notes
app.post("/api/notes", function (req, res) {
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
app.delete("/api/notes/:id", function (req, res) {
    var index = req.body.index;
    var temp = [];
    for (var i = 0; i < notes.length; i++) {
        if (i !== parseInt(index)) {
            temp.push(notes[i]);
        }
    }
    notes = temp;
    res.send("note removed")
})