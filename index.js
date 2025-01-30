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
            /*Each case will allow the user to do their desired action*/
            switch (answer.action) {
                case "View all Departments":
                    viewAllDepartments();
                    break;
                case "View all Roles":
                    viewAllRoles();
                    break;
                case "View all Employees":
                    viewAllEmployees();
                    break;
                case "Add a Department":
                    addADepartment();
                    break;
                case "Add a Role":
                    addARole();
                    break;
                case "Add an Employee":
                    addAnEmployee();
                    break;
                case "Update an Employee's Role":
                    updateEmployeeRole();
                    break;
                case "Exit Application":
                    process.exit();
            } /*End Switch*/
        }); /*End Then*/
}

start();