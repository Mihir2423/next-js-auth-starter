#!/usr/bin/env node

const { execSync } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
    return true;
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }
};

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

const main = async () => {
  const repoName = process.argv[2];
  if (!repoName) {
    console.error("Please specify the project name");
    process.exit(1);
  }

  const packageManager = await askQuestion("Would you like to use npm or pnpm? (npm/pnpm): ");
  if (packageManager !== "npm" && packageManager !== "pnpm") {
    console.error("Invalid package manager. Please choose either npm or pnpm.");
    process.exit(1);
  }

  const gitCheckoutCommand = `git clone --depth 1 https://github.com/Mihir2423/edit_bridge ${repoName}`;
  const installDepsCommand = `cd ${repoName} && ${packageManager} install`;

  console.log(`Cloning repository with the name ${repoName}`);

  if (runCommand(gitCheckoutCommand)) {
    console.log(`Installing dependencies for ${repoName} using ${packageManager}`);
    
    if (runCommand(installDepsCommand)) {
      console.log(`
Successfully cloned and installed dependencies for ${repoName}
To start the project, run the following commands:
  cd ${repoName}
  ${packageManager} start
      `);
    }
  } else {
    console.error(`Failed to clone repository ${repoName}`);
  }

  rl.close();
};

main();
