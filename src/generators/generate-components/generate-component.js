import Handlebars from "handlebars";
import fs from "fs";

export const generateComponent = () => {
  // read the file and use the callback to render
  fs.readFile(
    "../../templates/component/javascript/component.hbs",
    function (err, data) {
      if (!err) {
        // make the buffer into a string
        var source = data.toString();
        // call the render function
        renderToString(source, { ComponentName: "Button" });
      } else {
        // handle file read error
      }
    }
  );
};

export default generateComponent;

// this will be called after the file is read
function renderToString(source, data) {
  var template = Handlebars.compile(source);
  var outputString = template(data);
  console.log(outputString);
  return outputString;
}
