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
    console.log("it works");
    const data = fs.readFileSync("db/db.json", { encoding: "utf8" });
    console.log("it is reading");
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
        const database = JSON.parse(data);
        for (var i = 0; i < database.length; i++) {
                const noteCard = {
                    title: database[i].title,
                    text: database[i].text,
                    id: i+1
                };
                notes.push(noteCard);
        }
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notes, null, 10), (err) => {
            if (err) throw err;
            res.json(req.body);
        });
    });
})


// api/delete/note
app.delete("/api/notes/:id", (req, res) => {
    const notes = [];
    var noteId = parseInt(req.params.id);
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        const database = JSON.parse(data);
        // const notes = [];
        for (var i = 0; i < database.length; i++) {
            if (i !== noteId) {
                const noteCard = {
                    title: database[i].title,
                    text: database[i].text,
                    id: notes.length
                };
                notes.push(noteCard);
            }
        }
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notes, null, 10), (err) => {
            if (err) throw err;
            res.json(req.body);
        });
    });
})


//         var dataDel = JSON.parse(data);
//         dataDel.push(noteId);
//         dataDel = dataDel.filter(function(note) {
//             return note.id != noteId
//         });
//         fs.writeFile("/db/db.json", JSON.stringify(dataDel), function (err){
//             if (err) throw err;
//             console.log("Success")
//         });

//     });
//     res.sendFile(path.join(__dirname, "db/db.json"))
// });


// index.html
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// start server
app.listen(PORT, () => {
    console.log("App listening on PORT http://localhost:" + PORT)
})


// post api / notes
// app.post('/api/notes', (req, res) => {
//     var newNote = req.body;
//     console.log("api notes");
//     console.log(newNote);
//     notes.push(newNote);
//     fs.readFile("db/db.json", (err, data) => {
//         // console.log(data);
//         if (err) throw err;
//         var newData = JSON.parse(data);
//         newData.push(newNote);
//         console.log(newData);
//         // console.log(data.title);

//         fs.writeFile("db/db.json", JSON.stringify(newData), (err) => {
//             if (err) throw err;
//         });
//     });
// });
