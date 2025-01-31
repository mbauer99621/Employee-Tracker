//queries.js
//Maya Li Bauer
//January 30, 2025

import pg from "pg";
const { Client } = pg;

import inquirer from "inquirer";


import { start } from "./index.js";  


const client = new Client({ 
    user : "postgres",
    password : "Caribou99621!",
    port : 5432,
    host : "localhost" 
});

client.connect();

//Allows the user to view all of the departments
//NEEDS ID AND NAME
function viewAllDepartments() {
    client.query( "SELECT department.id, department.name FROM department", (err, dataTable) => {
        if (err) throw err;
        console.table(dataTable.rows);
        start();
    });
}

//Allows the user to view all of the roles
//NEEDS ROLE TITLE, ID, DEPARTMENT NAME, SALARY, ID
function viewAllRoles() {
    client.query(
      "SELECT role.title, role.id, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id", (err, dataTable) => {
        if (err) throw err; 
        console.table(dataTable.rows); 
        start(); 
      });
}
  

//Allows the user to view all employees
//NEEDS ALL INFO
function viewAllEmployees() {
    client.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id", (err, dataTable) => {
        if (err) throw err; 
        console.table(dataTable.rows); 
        start(); 
      });
}

// Allows the user to add a department
function addADepartment() {
    inquirer
      .prompt({
        type: "input",
        name: "name",
        message: "Enter the New Department:" //Prompt the user 
      })
      .then((answer) => {
        client.query("INSERT INTO department (name) VALUES ($1)", [answer.name], (err, dataTable) => {
          if (err) throw err;
          console.log("Department Added."); 
          start(); 
        });
    });
}

//allows the user to delete a department
function deleteADepartment() {
    client.query("SELECT * FROM department", (err, dataTable) => {
        if (err) throw err;

        const departments = dataTable.rows.map((dept) => dept.name);

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "department",
                    message: "Select the department to delete:",
                    choices: departments
                }
            ])
            .then((answer) => {
                const department = dataTable.rows.find(dept => dept.name === answer.department);

                client.query("DELETE FROM department WHERE id = $1", [department.id], (err, result) => {
                    if (err) throw err;
                    console.log(`Department "${answer.department}" Was Deleted.`);
                    start(); 
                });
            });
    });
}

// Allows the user to add a role
function addARole() {
    client.query("SELECT * FROM department", (err, dataTable) => {
      if (err) throw err; 
      const departments = dataTable.rows.map((department) => department.name); 
  
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "Enter the New Role:" 
          },
          {
            type: "input",
            name: "salary",
            message: "Enter the Salary for the New Role:" 
          },
          {
            type: "list",
            name: "department",
            message: "Select the Department for this New Role:", 
            choices: departments //pre determined departments 
          }
        ])
        .then((answer) => {
          const department = dataTable.rows.find(department => department.name === answer.department);
  
          //inserted in to the correct spot
          client.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [answer.title, answer.salary, department.id], (err, dataTable) => {
            if (err) throw err; 
            console.log("Role Added."); 
            start(); 
            });
        });
    });
}


// Allows the user to add an employee
function addAnEmployee() {
    client.query("SELECT * FROM role", (err, roleTable) => {
      if (err) throw err; 
      client.query("SELECT * FROM employee", (err, employeeTable) => {
        if (err) throw err; 

        const roles = roleTable.rows.map((role) => role.title); 
        const managers = employeeTable.rows.map((employee) => `${employee.first_name} ${employee.last_name}`); 
  
        inquirer
          .prompt([
            {
                //gives the employee their name
              type: "input",
              name: "first_name",
              message: "Enter the Employee's First Name:" 
            },
            {
              type: "input",
              name: "last_name",
              message: "Enter the Employee's Last Name:" 
            },
            {
              type: "list",
              name: "role",
              message: "Select the Employee's Role:",
              choices: roles
            },
            {
              type: "list",
              name: "manager",
              message: "Select the Employee's Manager:", 
              choices: managers
            }
          ])
          .then((answer) => {
            const role = roleTable.rows.find((role) => role.title === answer.role);
            const manager = employeeTable.rows.find((employee) => `${employee.first_name} ${employee.last_name}` === answer.manager);
  
            //insert into correct spot
            client.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [answer.first_name, answer.last_name, role.id, manager.id], (err, dataTable) => {
              if (err) throw err; 
              console.log("Employee Added.");
              start();
            });
          });
      });
    });
}

// Allows the user to update an employee's role
function updateEmployeeRole() {

    client.query("SELECT * FROM employee", (err, employeeTable) => {
      if (err) throw err; 
      client.query("SELECT * FROM role", (err, roleTable) => {
        if (err) throw err; 
        const employees = employeeTable.rows.map((employee) => `${employee.first_name} ${employee.last_name}`); 
        const roles = roleTable.rows.map((role) => role.title);
  
      
        inquirer
          .prompt([
            {
              type: "list",
              name: "employee",
              message: "Select the employee to update:", 
              choices: employees 
            },
            {
              type: "list",
              name: "role",
              message: "Select the new role for the employee:", 
              choices: roles 
            }
          ])
          .then((answer) => {
            const employee = employeeTable.rows.find((emp) => `${emp.first_name} ${emp.last_name}` === answer.employee);
            const role = roleTable.rows.find((role) => role.title === answer.role);
  
            client.query("UPDATE employee SET role_id = $1 WHERE id = $2", [role.id, employee.id], (err, dataTable) => {
              if (err) throw err; 
              console.log("Employee Role Updated."); 
              start();
            });
          });
      });
    });
}

export {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addADepartment,
    deleteADepartment,
    addARole,
    addAnEmployee,
    updateEmployeeRole
};
  


  