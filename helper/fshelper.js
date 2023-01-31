const fs = require("fs");
const util = require("util");

const read = util.promisify(fs.readFile);

const writeTheFile = (destination, answer) =>
  fs.writeFile(destination, JSON.stringify(answer, null, 2), (err) =>
    err ? console.error(err) : console.info("info written")
  );

const readAppend = (answer, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsed = JSON.parse(data);
      parsed.push(answer);
      writeTheFile(file, parsed);
    }
  });
};

module.exports = { writeTheFile, read, readAppend };
