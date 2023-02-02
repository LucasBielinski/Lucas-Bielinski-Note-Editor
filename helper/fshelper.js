const fs = require("fs");
const util = require("util");

// promisify contents of the read file
const read = util.promisify(fs.readFile);
// writes the content to the jason file
const writeTheFile = (destination, answer) =>
  fs.writeFile(destination, JSON.stringify(answer, null, 2), (err) =>
    err ? console.error(err) : console.info("info written")
  );
// reads and appends the file
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
