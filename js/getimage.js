function getdir() {
  var fs = require("fs");
  var files = fs.readdirSync("./images");
  console.log(files);
}

getdir();