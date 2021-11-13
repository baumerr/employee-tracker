const db = require("./db/connection");
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

// questions we must answer
// 'View All Departments'
// 'View All Roles'
// 'View All Employees'
// 'Add a Department'
// 'Add a Role'
// 'Add a Employee'
// 'Update an Employee'
// BONUS----->
// 'Update Employee Manager'
// 'View Employee By Manager'
// 'View Employee By Department'
// 'Delete Department'
// 'Delete Role'
// 'Delete Employee'

function start() {
  inquirer
    .prompt({
      type: "list",
      name: "checkDatabase",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee",
      ],
    })
    .then((answer) => {
      switch (answer.checkDatabase) {
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        // case "Add a Role":
        //   addRole();
        //   break;
        // case "Add an Employee":
        //   addEmployee();
        //   break;
        // case "Update an Employee":
        //   updateEmployee();
        //   break;
        default:
          db.end();
      }
    });
}

function viewDepartments() {
  var select = `SELECT * FROM department`;
  db.query(select, function (err, response) {
    if (err) throw err;
    console.table(response);
    exit();
  });
};

function viewRoles() {
  var select = `SELECT * FROM roles`;
  db.query(select, function (err, response) {
    if (err) throw err;
    console.table(response);
    exit();
  });
};

function viewEmployees() {
  var select = `SELECT * FROM employee`;
  db.query(select, function (err, response) {
    if (err) throw err;
    console.table(response);
    exit();
  });
};

function addDepartment () {
    inquirer.prompt({
        type: 'input',
        name: 'newDepartment',
        message: 'What is the name of the new department?'
    }).then (answer => {
        const newDepartment = answer.newDepartment;

        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        db.query(sql, newDepartment, (err, response) => {
            if (err) throw err;
            console.log(`You have added ${newDepartment} as a new department!`);
            exit();
        })
    })
}

function exit() {
    inquirer.prompt({
        type: 'confirm',
        name: 'continue',
        message: 'Would you like to continue?',
        default: false
    }).then(answer => {
        if (answer.continue === true) {
            start();
        } else {
            db.end();
        }
    })
}

db.connect((err) => {
  if (err) throw err;
  console.log(`Connected to the Database! ${db.threadId}`);
  start();
});
