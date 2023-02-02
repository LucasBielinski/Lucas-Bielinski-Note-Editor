const express = require("express");

const notesRoute = require("./notes");

const it = express();

// middlewear uses notes route for notes
it.use(`/notes`, notesRoute);

module.exports = it;
