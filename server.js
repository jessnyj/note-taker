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

// notes array
var notes = [];

// routes/redirects
// notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});


// api notes
app.get('/api/notes', (req, res) => {
    console.log("it works");
    const data = fs.readFileSync("db/db.json", {encoding: "utf8"});
        console.log("it is reading");
        var newData = JSON.parse(data);
        return res.json(newData);
    })


// post api/notes
app.post('/api/notes', (req, res) => {
    var newNote = req.body;
    console.log("api notes");
    console.log(newNote);
    fs.readFile("db/db.json", (err, data) => {
        console.log(data);
        if (err) throw err;
        var newData = JSON.parse(data);
        newData.push(newNote);
        console.log(newData);
        // console.log(data.title);


        fs.writeFile("db/db.json", JSON.stringify(newData), (err) => {
            if (err) throw err;
            
        });
    

    })

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

// index.html
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// start server
app.listen(PORT, () => {
    console.log("App listening on PORT http://localhost:" + PORT)
})

