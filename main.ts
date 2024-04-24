#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// Initialize Balance and Pin code

let myBalance = 10000;
let myPin = 1234;

console.log(chalk.cyanBright("\n \t Welcome to ATM Machine\n"));

let pinAnswer = await inquirer.prompt([
  {
    name: "pinNumber",
    type: "number",
    message: chalk.yellow("Enter Your Pin Code:"),
  },
]);

if (pinAnswer.pinNumber === myPin) {
  console.log(chalk.green("\n \tPin is Correct, Login Succesfully\n"));

  let operationAnswer = await inquirer.prompt([
    {
      name: "Operations",
      type: "list",
      message: chalk.yellow("Select An Operation:"),
      choices: ["Fast Cash", "Withdraw Amount", "Check Balance", "Exit"],
    },
  ]);

  if (operationAnswer.Operations === "Fast Cash") {
    let fastcashAns = await inquirer.prompt([
      {
        name: "withdrawlMethod",
        type: "list",
        message: chalk.yellow("Selet Amount:"),
        choices: [1000, 2000, 5000, 10000, 15000],
      },
    ]);
    if (fastcashAns.withdrawlMethod > myBalance) {
      console.log(chalk.redBright("\n \tInsufficient Amount!\n"));
    } else {
      myBalance -= fastcashAns.withdrawlMethod;
      console.log(chalk.magentaBright(`\n \t${fastcashAns.withdrawlMethod} withdraw Succesfully\n`));
      console.log(chalk.gray(`Your Remaining Balance is: ${myBalance}`));
    }
  } else if (operationAnswer.Operations === "Withdraw Amount") {
    let amountAnswer = await inquirer.prompt([
      {
        name: "Amount",
        type: "number",
        message: chalk.yellow("Enter the amount to withdraw:"),
      },
    ]);

    if (amountAnswer.Amount > myBalance) {
      console.log(chalk.redBright("\n \tInsufficient Balance!\n"));
    } else {
      myBalance -= amountAnswer.Amount;
      console.log(chalk.magentaBright(`\n \t${amountAnswer.Amount} Withdraw Succesfully\n`));
      console.log(chalk.gray(`Your Remaining Balance is: ${myBalance}`));
    }
  } else if (operationAnswer.Operations === "Check Balance") {
    console.log(chalk.bgMagenta(`\n \tYour Account Balance is: ${myBalance}\n`));
  }
} else {
  console.log(chalk.redBright("\n \tINCORRECT PIN CODE, LOGIN FAILED!\n"));
}

console.log(chalk.cyanBright("\n \t======= THANK YOU =======\n"));
