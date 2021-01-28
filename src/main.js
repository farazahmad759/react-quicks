import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import { generateComponent } from "./generators";
const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const currentFileUrl = import.meta.url;
  let filePath = new URL(currentFileUrl).pathname;
  if (filePath[0] === "/") {
    filePath = filePath.replace("/", "");
  } else if (filePath[0] === "\\") {
    filePath = filePath.replace("\\", "");
  }
  let templateDir = path.resolve(
    filePath,
    "../../templates",
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;
  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error(
      "%s Invalid template name",
      chalk.red.bold("ERROR"),
      filePath,
      err
    );
    process.exit(1);
  }

  console.log("Copy project files");
  await copyTemplateFiles(options);

  // generateComponent
  generateComponent();
  console.log("%s Project ready", chalk.green.bold("DONE"));

  return true;
}
