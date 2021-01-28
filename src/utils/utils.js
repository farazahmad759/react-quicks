import Handlebars from "handlebars";
// this will be called after the file is read
function renderToString(source, data) {
  var template = Handlebars.compile(source);
  var outputString = template(data);
  console.log(outputString);
  return outputString;
}

export default renderToString;
