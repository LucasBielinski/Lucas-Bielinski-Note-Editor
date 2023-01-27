const fs = require("fs");
const util = require("util");

const read = util.promisify(fs.readFile);

const readAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsed = JSON.parse(data);
      parsed.push(content);
      writeToFile(file, parsed);
    }
  });
};

module.exports = { read, readAppend };
