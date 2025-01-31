//index.js
//Maya Li Bauer
//January 30, 2025

import inquirer from "inquirer";
import * as queries from "./queries.js";

export function start() {
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
                "Delete a Department",
                "Exit Application"
            ]
        }) /*End Prompt*/
        .then((answer) => {
            /*Each case will allow the user to do their desired action*/
            switch (answer.action) {
                case "View all Departments":
                    queries.viewAllDepartments();
                    break;
                case "View all Roles":
                    queries.viewAllRoles();
                    break;
                case "View all Employees":
                    queries.viewAllEmployees();
                    break;
                case "Add a Department":
                    queries.addADepartment();
                    break;
                case "Add a Role":
                    queries.addARole();
                    break;
                case "Add an Employee":
                    queries.addAnEmployee();
                    break;
                case "Update an Employee's Role":
                    queries.updateEmployeeRole();
                    break;
                case "Delete a Department":
                    queries.deleteADepartment();
                    break;
                case "Exit Application":
                    process.exit();
            } /*End Switch*/
        }); /*End Then*/
}

start();