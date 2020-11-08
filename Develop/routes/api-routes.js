const db = require("../db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
uuidv4();

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.send(db);
  });

  app.post("/api/notes", function (req, res) {
    let noteIdentification = uuid();
    let newNote = {
      id: noteIdentification,
      title: req.body.title,
      text: req.body.text,
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      const everyNote = JSON.parse(data);

      everyNote.push(newNote);
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(everyNote, null, 2),
        (err) => {
          if (err) throw err;
          res.send(db);
          console.log("A note was made!");
        }
      );
    });
  });

  app.delete("/api/notes/:id", (req, res) => {
    let noteIdentification = req.params.id;

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      const everyNote = JSON.parse(data);
      const everyNewNote = everyNote.filter(
        (note) => note.id != noteIdentification
      );

      fs.writeFile(
        "./db/db.json",
        JSON.stringify(everyNewNote, null, 2),
        (err) => {
          if (err) throw err;
          res.send(db);
          console.log("A note was deleted!");
        }
      );
    });
  });
};
