import Handlebars from "handlebars";
import fs from "fs";
import { renderToString, writeFile } from "./../../utils";
export const generateComponent = (options) => {
  let { type, name } = options;
  console.log(options);
  // read the file and use the callback to render
  fs.readFile(
    options.templateDirectory + "/javascript/component.js.hbs",
    function (err, data) {
      if (!err) {
        // make the buffer into a string
        var source = data.toString();
        // call the render function
        let content = renderToString(source, { name: name });
        writeFile(
          options.targetDirectory +
            "/examples/test/javascript/" +
            options.name +
            "/" +
            options.name +
            ".js",
          content
        );
        // fs.writeFileSync(
        //   options.targetDirectory +
        //     "/examples/test/javascript/" +
        //     options.name +
        //     "/" +
        //     options.name +
        //     ".js",
        //   content
        // );
      } else {
        console.log("err", err);
        // handle file read error
      }
    }
  );
};

export default generateComponent;
