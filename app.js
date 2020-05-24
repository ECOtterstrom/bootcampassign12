const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");
const printMessage = require('print-message');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "secretpassword",
    database: "company_db"
});

connection.connect(function (err) {
    if (err) throw err;
    runProgram();
});

function runProgram() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add an Employee",
                "Update an Employee Role",
                "Add a Role",
                "View All Roles",
                "Add a Department",
                "View All Departments"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    allEmployees();
                    break;

                case "View All Employees by Department":
                    employeesDept();
                    break;

                case "View All Employees by Manager":
                    employeesMgr();
                    break;

                case "Add an Employee":
                    addEmployee();
                    break;

                case "Update an Employee Role":
                    updateRole();
                    break;
                case "Add a Role":
                    addRole();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                case "Add a Department":
                    addDepartment();
                    break;

                case "View All Departments":
                    viewDepartments();
                    break;
            }
        });
}


// What would you like to do?
//     View All Employees
//     View All Employees by Department
//     View All Employees by Manager
//     Add an Employee
//     Update an Employee Role
//     Add a Role
//     View All Roles
//     Add a Department
//     View All Departments
//     (Move up and down to view all options)

// View All Employees
//     Select emplId, first_name, last_name, title, name, salary, manager 
//     from company_db.employee
//     join company_db.role
//     on 
//Add departments, roles, employees

//View departments, roles, employees

//Update employee roles