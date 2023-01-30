const express = require("express");

const notesRoute = require("./notes");

const it = express();

it.use(`/notes`, notesRoute);

module.exports = it;
