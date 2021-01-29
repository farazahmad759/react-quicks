import Handlebars from "handlebars";
import fs from "fs";
import { renderToString, writeFile, readdirAsync } from "./../../utils";
export const generateComponent = async (options) => {
  console.log(options);
  let inputDir = options.templateDirectory + "/javascript/";
  let outputDir = options.targetDirectory + options.outputDir;
  let files = await readdirAsync(inputDir);
  files.forEach((file) => {
    if (file.includes("index.js.hbs")) {
      createIndexFile(inputDir + file, outputDir, options);
    } else if (file.includes("test.js.hbs")) {
      createTestJsFile(inputDir + file, outputDir, options);
    } else if (file.includes(".js.hbs")) {
      createJsFile(inputDir + file, outputDir, options);
    } else if (file.includes(".css.hbs")) {
      createCSSFile(inputDir + file, outputDir, options);
    }
  });
};

export default generateComponent;

function createIndexFile(inputPath, outputDir, options) {
  let { type, name } = options;
  // read the file and use the callback to render
  fs.readFile(inputPath, function (err, data) {
    if (!err) {
      // make the buffer into a string
      var source = data.toString();
      // call the render function
      let content = renderToString(source, { name: name.toLowerCase() });
      writeFile(
        outputDir + options.name.toLowerCase() + "/" + "index" + ".js",
        content
      );
    } else {
      console.log("err", err);
      // handle file read error
    }
  });
}
function createTestJsFile(inputPath, outputDir, options) {
  let { type, name } = options;
  // read the file and use the callback to render
  fs.readFile(inputPath, function (err, data) {
    if (!err) {
      // make the buffer into a string
      var source = data.toString();
      // call the render function
      let content = renderToString(source, { name: name });
      writeFile(
        outputDir +
          options.name.toLowerCase() +
          "/" +
          options.name.toLowerCase() +
          ".js",
        content
      );
    } else {
      console.log("err", err);
      // handle file read error
    }
  });
}
function createJsFile(inputPath, outputDir, options) {
  let { type, name } = options;
  // read the file and use the callback to render
  fs.readFile(inputPath, function (err, data) {
    if (!err) {
      // make the buffer into a string
      var source = data.toString();
      // call the render function
      let content = renderToString(source, { name: name });
      writeFile(
        outputDir +
          options.name.toLowerCase() +
          "/" +
          options.name.toLowerCase() +
          ".js",
        content
      );
    } else {
      console.log("err", err);
      // handle file read error
    }
  });
}
function createCSSFile(inputPath, outputDir, options) {
  let { type, name } = options;
  // read the file and use the callback to render
  fs.readFile(inputPath, function (err, data) {
    if (!err) {
      // make the buffer into a string
      var source = data.toString();
      // call the render function
      let content = renderToString(source, { name: name });
      writeFile(
        outputDir +
          options.name.toLowerCase() +
          "/" +
          options.name.toLowerCase() +
          ".css",
        content
      );
    } else {
      console.log("err", err);
      // handle file read error
    }
  });
}
