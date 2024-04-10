#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 10000;
let pinCode = 1234;
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.yellow("Enter your pin :"),
        type: "number"
    }
]);
if (pinAnswer.pin === pinCode) {
    console.log(chalk.green("Correct pin code !!"));
    let operationAnswer = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.yellow("Select an operation "),
            choices: ["Withdraw", "Check Balance"]
        }
    ]);
    if (operationAnswer.operation === "Withdraw") {
        let WithdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select Withdraw Method",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (WithdrawAns.withdrawMethod === "Fast Cash") {
            let fastcash = await inquirer.prompt([
                {
                    name: "FastCash",
                    type: "list",
                    message: chalk.yellow("Select Amount"),
                    choices: ["500", "1000", "2000", "5000"]
                }
            ]);
            if (fastcash.FastCash < myBalance) {
                myBalance -= fastcash.FastCash;
                console.log(chalk.green `${fastcash.FastCash} Withdraw Successfully`);
                console.log(`Your Remaining Balance is ${myBalance}`);
            }
        }
        if (WithdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: chalk.yellow("Enter your amount"),
                    type: "number",
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`Your Remaining Balance is  ${myBalance}`);
            }
        }
    }
    else if (operationAnswer.operation === "Check Balance") {
        console.log("Your Account Balance is :" + myBalance);
    }
}
else {
    console.log(chalk.red("Pin is Incorrect"));
}
