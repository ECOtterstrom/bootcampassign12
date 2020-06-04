var mysql = require("mysql");
var cTable = require("console.table");
var inquirer = require("inquirer");
var printMessage = require('print-message');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "secretpassword",
    database: "company_db"
});

function validateString(answer) {
    if (answer != "" && isNaN(parseInt(answer))) {
        return true;
    }
    return false;
}

function validateNumber(answer) {
    if (answer != "" && !isNaN(parseInt(answer))) {
        return true;
    }
    return false;
}

function continuePrompt() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "continue",
            message: "Would you like to continue?"
        }
    ]).then(function (data) {
        if (data.continue) {
            runProgram();
        }
        else {
            return;
        }
    });
}

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
                "Update an Employee Manager",
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

                case "Update an Employee Manager":
                    updateEmployeeManager();
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

function allEmployees() {
    var query = connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        console.table(data);
        continuePrompt();
    })
}

function employeesDept() {
    var query = connection.query("SELECT name as 'Department',first_name as 'First Name',last_name as 'Last Name',title as 'Role' FROM employee JOIN role ON role_id = roleId JOIN department ON department_id = deptId ORDER BY name",
        function (err, data) {
            if (err) throw err;
            console.table(data);
            continuePrompt();
        })
}

function employeesMgr() {
    var query = connection.query(
        "SELECT name as 'Department',first_name as 'First Name',last_name as 'Last Name',title as 'Role' FROM employee JOIN role ON role_id = roleId JOIN department ON department_id = deptId ORDER BY name",
        function (err, data) {
            if (err) throw err;
            console.table(data);
            continuePrompt();
        })
}

function addEmployee() {
    connection.query("SELECT emplId, first_name, last_name FROM employee", function (err, data) {
        if (err) {
            throw err;
        }
        // data represents the employees we got back from the DB
        //connection.query("SELECT roleId, title, salary, department_id FROM role");
        var employeeChoices = data.map(function (employee) {
            var employeeChoice = {
                name: employee.first_name + " " + employee.last_name,
                value: employee.emplId
            }
            return employeeChoice;
        })
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter the first name:",
                validate: validateString
            },
            {
                type: "input",
                name: "last_name",
                message: "Enter the last name:",
                validate: validateString
            },
            // {
            //     type: "list",
            //     name: "role",
            //     message: "Select the role:",
            //     choices: [...choices]
            // },
            {
                type: "list",
                name: "employeeId",
                message: "Select the manager:",
                choices: employeeChoices
            }
        ]).then(function (data) {
            console.log(data);
            var arr = data.role.split(" ");
            var roleID = parseInt(arr[0]);
            var arr = data.department.split(" ");
            var deptID = parseInt(arr[0]);
            var query = connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${data.first_name}', '${data.last_name}', ${roleId}, ${deptId})`,
                function (err, data) {
                    if (err) throw err;
                    continuePrompt();
                });
        });


    })




    /* const choices = [
         {
             name: 'Dope Engineer',
             value: employeeId
         }
     ]*/

};

function updateRole() {
    const emp = {
        first_name: "",
        last_name: "",
        role_id: 0,
        manager_id: 0,
        emplID: 0
    };
    var query = connection.query("SELECT emplId, first_name, last_name FROM employee", function (err, data) {
        if (err) throw err;
        let choices = data.map(x => `${x.emplId} - ${x.first_name} ${x.last_name}`);
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Select an employee:",
                choices: [...choices]
            }
        ]).then(function (data) {
            var arr = data.employee.split(" ");
            emp.emplId = parseInt(arr[0]);

            emp.first_name = data.firstName;
            emp.last_name = data.lastName;
            var query = connection.query("SELECT roleId, title FROM role", function (err, data) {
                if (err) throw err;
                let choices = data.map(x => `${x.roleId} - ${x.title}`);
                inquirer.prompt([
                    {
                        type: "list",
                        name: "title",
                        message: "Select a title:",
                        choices: [...choices]
                    }
                ]).then(function (data) {
                    var arr = data.title.split(" ");
                    emp.role_id = parseInt(arr[0]);
                    connection.query(`UPDATE employee SET role_id = ${emp.role_id} WHERE emplId = ${emp.emplId}`, function (err, data) {
                        if (err) throw err;
                        continuePrompt();
                    });
                });
            });
        });
    });
}

function updateEmployeeManager() {
    var query = connection.query("SELECT emplId, first_name, last_name FROM employee", function (err, data) {
        if (err) throw err;
        let choices = data.map(x => `${x.emplId} - ${x.first_name} ${x.last_name}`);
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Select an employee:",
                choices: [...choices]
            }
        ]).then(function (data) {
            var arr = data.employee.split(" ");
            let emplId = parseInt(arr[0]);
            //Need to update choices so the choices array does not include the employee selected above
            choices.push("This employee does not have a manager");
            inquirer.prompt([
                {
                    type: "list",
                    name: "manager",
                    message: "Select this employee's manager:",
                    choices: [...choices]
                }
            ]).then(function (data) {
                var manager_id;
                if (data.manager === "This employee does not have a manager") {
                    manager_id = null;
                }
                else {
                    var arr = data.manager.split(" ");
                    manager_id = parseInt(arr[0]);
                }
                var query = connection.query(`UPDATE employee SET manager_id = ${manager_id} WHERE emplId = ${emplId}`, function (err, data) {
                    if (err) throw err;
                    continuePrompt();
                    return data;
                });
            });
        });
    });
}



function addRole() {
    var query = connection.query("SELECT id, department FROM department", function (err, data) {
        if (err) throw err;
        // let choices = data.map(x => `${x.id} - ${x.department}`);
        let choices = [];
        for (let i = 0; i < data.length; i++) {
            choices.push(data[i].id + " - " + data[i].department);
        }
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Enter the role name:",
                validate: validateString
            },
            {
                type: "input",
                name: "salary",
                message: "Enter the salary:",
                validate: validateNumber
            },
            {
                type: "list",
                name: "department",
                message: "Select the department:",
                choices: [...choices]
            }
        ]).then(function (data) {
            var arr = data.department.split(" ");
            var deptID = parseInt(arr[0]);
            var query = connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${data.title}', ${data.salary}, ${deptID})`, function (err, data) {
                if (err) throw err;
                continuePrompt();
            });
        });
    });
}

function viewRoles() {
    var query = connection.query(
        "SELECT roleId as 'Role ID', title as 'Role', salary as 'Salary', department_id as 'Department ID' from role",
        function (err, data) {
            if (err) throw err;
            console.table(data);
            continuePrompt();
        })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Enter the department's name:",
            validate: validateString
        }
    ]).then(function (data) {
        var query = connection.query(`INSERT INTO department (department) 
                    VALUES ('${data.department}');`, function (err, data) {
            if (err) throw err;
            return data;
            continuePrompt();
        });
    })
}

function viewDepartments() {
    var query = connection.query(
        "SELECT name as 'Department Name', deptId as 'Department ID' from department ORDER BY name",
        function (err, data) {
            if (err) throw err;
            console.table(data);
            continuePrompt();
        }
    )
}

//runProgram();