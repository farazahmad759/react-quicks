import arg from "arg";
import inquirer from "inquirer";
import { createProject } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--yes": Boolean,
      "--path": String,
      "-y": "--yes",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    template: args._[0],
    name: args._[1],
    outputDir: "/src/" + args["--path"] + "/" || "/src/components/",
  };
}
async function promptForMissingOptions(options) {
  const defaultTemplate = "component";
  const defaultName = "NewComponent";
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
      name: options.name || defaultName,
    };
  }

  const questions = [];
  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: ["component", "javascript", "typescript"],
      default: defaultTemplate,
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}
