const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");
var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "secretpassword",
        database: "company_db"
});

