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
app.use(express.static(path.join(__dirname, 'public')));

// notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// api notes
app.get('/api/notes', (req, res) => {
    const data = fs.readFileSync("db/db.json", { encoding: "utf8" });
    var newData = JSON.parse(data);
    return res.json(newData);
});

// api post
app.post("/api/notes", (req, res) => {
    const notes = [];
    var newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        var newData = JSON.parse(data);
        for (var i = 0; i < newData.length; i++) {
            const noteCard = {
                title: newData[i].title,
                text: newData[i].text,
                id: (i + 1),
            };
            notes.push(noteCard);
        }
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notes, null, 10), (err) => {
            if (err) throw err;
            res.json(req.body);
        });
    });
})

// api delete
app.delete("/api/notes/:id", (req, res) => {
    const notes = [];
    var noteId = parseInt(req.params.id);
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        var newData = JSON.parse(data);
        for (var i = 0; i < newData.length; i++) {
            if (i != noteId) {
                const noteCard = {
                    title: newData[i].title,
                    text: newData[i].text,
                    id: notes.length,
                }
                notes.push(noteCard);
            }
        }
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notes, null, 10), (err) => {
            if (err) throw err;
            res.json(req.body);
        });
    });
})

// index.html
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// start server
app.listen(PORT, () => {
    console.log("App listening on PORT http://localhost:" + PORT)
})

