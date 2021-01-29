import Handlebars from "handlebars";
var mkdirp = require("mkdirp");
var fs = require("fs");
var getDirName = require("path").dirname;

// read contents of handlebars file
export function renderToString(source, data) {
  var template = Handlebars.compile(source);
  var outputString = template(data);
  return outputString;
}

export function writeFile(path, contents) {
  mkdirp.sync(getDirName(path));
  fs.writeFileSync(path, contents);
}

export function readdirAsync(path) {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, function (error, result) {
      if (error) {
        reject(error);
      } else {
        let res = resolve(result);
        console.log(result);
        return res;
      }
    });
  });
}
