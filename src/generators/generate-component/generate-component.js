import Handlebars from "handlebars";
import fs from "fs";
import { renderToString } from "./../../utils";
export const generateComponent = (options) => {
  let { type, componentName } = options;
  // read the file and use the callback to render
  fs.readFile(
    options.templateDirectory + "/javascript/component.js.hbs",
    function (err, data) {
      if (!err) {
        // make the buffer into a string
        var source = data.toString();
        // call the render function
        renderToString(source, { componentName: componentName });
      } else {
        console.log("err", err);
        // handle file read error
      }
    }
  );
};

export default generateComponent;
