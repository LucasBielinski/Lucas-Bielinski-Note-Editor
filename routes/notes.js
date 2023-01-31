const am = require("express").Router();
const { read, readAppend } = require("../helper/fshelper");

am.get("/", (req, res) => {
  console.info(`${req.method} has been made for notes`);

  read("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

am.post("/", (req, res) => {
  console.info(`${req.method} submission request`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
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

module.exports = am;
