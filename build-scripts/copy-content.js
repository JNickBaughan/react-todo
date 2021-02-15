// include fs-extra package
var fs = require("fs-extra");

//var source = "src/content";
var serverSource = "src/server.js";
var destination = "dist";

if (!fs.existsSync(`${destination}`)) {
  fs.mkdirSync(`${destination}`);
}

// copy source folder to destination
// fs.copy(source, destination, function (err) {
//   if (err) {
//     console.log("An error occured while copying the folder.");
//     return console.error(err);
//   }
//   console.log("Copy completed!");
// });

fs.copyFile(serverSource, destination + "/server.js", function (err) {
  if (err) {
    console.log("An error occured while copying the server.");
    return console.error(err);
  }
  console.log("Copy completed!");
});
