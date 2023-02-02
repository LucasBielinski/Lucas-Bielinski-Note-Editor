const am = require("express").Router();
const { read, readAppend, writeTheFile } = require("../helper/fshelper");
const newId = require("../helper/idhelper");
// sends the data through GET
am.get("/", (req, res) => {
  console.info(`${req.method} has been made for notes`);

  read("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// creastes data with post
am.post("/", (req, res) => {
  console.info(`${req.method} submission request`);

  const { title, text } = req.body;
  // if it is missing title and text do not write
  if (title && text) {
    const newNote = {
      title,
      text,
      id: newId(),
    };
    readAppend(newNote, "./db/db.json");
    const response = {
      status: "added",
      body: newNote,
    };
    res.json(response);
  } else {
    res.json("can not add note at this time");
  }
});
// deletes the requested note
am.delete("/:id", (req, res) => {
  console.info(`${req.method} a request for deletion has been made`);
  read("./db/db.json")
    .then((data) => JSON.parse(data).filter((id) => id.id !== req.params.id))
    .then((data) => writeTheFile("./db/db.json", data));
  res.json("successfully deleted");
});

module.exports = am;
