//index.js
//Maya Li Bauer
//January 30, 2025

const inquirer = require("inquirer");
const db = require("./queries");

function start() {
    inquirer
        .prompt({
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: [
                "View all Departments",
                "View all Roles",
                "View all Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee's Role",
                "Exit Application"
            ]
        }) /*End Prompt*/
        .then((answer) => {
            switch (answer.action)
        })
}