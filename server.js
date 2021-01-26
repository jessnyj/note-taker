// dependencies
var express = require('express');
var fs = require('fs');
var path = require('path');

// set up express
const app = express();
const PORT = process.env.PORT || 3000;

// handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set static folder
// app.use(express.static(path.join(__dirname, 'public')));

// notes array
var notes = [];

// routes/redirects
// notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// index.html
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// api notes
app.get('/api/notes', (req, res) => {
    fs.readFile("db/db.json", (err, data) => {
        if (err) throw err;
        var newData = JSON.parse(data);
        return res.json(newData);
    })
});

// post api/notes
app.post('/api/notes', (req, res) => {
    var newNote = req.body;
    console.log(newNote);
    fs.readFile(db.json)
    // push newNote to
    // temp array 

    // take temp array and push to fswritefile
    fs.writeFile
        // notes.push(newNote);
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
    console.log("App listening on PORT http://localhost:" + PORT)
})

