const db = require("./db/connection");
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

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
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee":
          updateEmployee();
          break;
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
}
 //viewing WITHOUT exit function
function viewDepartments2() {
  var select = `SELECT * FROM department`;
  db.query(select, function (err, response) {
    if (err) throw err;
    console.table(response);
  });
}

function viewRoles() {
  var select = `SELECT * FROM roles`;
  db.query(select, function (err, response) {
    if (err) throw err;
    console.table(response);
    exit();
  });
}
//viewing WITHOUT exit function
function viewRoles2() {
  var select = `SELECT * FROM roles`;
  db.query(select, function (err, response) {
    if (err) throw err;
    console.table(response);
  });
}

function viewEmployees() {
  var select = `SELECT * FROM employee`;
  db.query(select, function (err, response) {
    if (err) throw err;
    console.table(response);
    exit();
  });
}
// viewing WITHOUT exit function
function viewEmployees2() {
  var select = `SELECT * FROM employee`;
  db.query(select, function (err, response) {
    if (err) throw err;
    console.table(response);
  });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "newDepartment",
      message: "What is the name of the new department?",
    })
    .then((answer) => {
      const newDepartment = answer.newDepartment;

      const sql = `INSERT INTO department (department_name) VALUES (?)`;
      db.query(sql, newDepartment, (err, response) => {
        if (err) throw err;
        console.log(`You have added ${newDepartment} as a new department!`);
        exit();
      });
    });
}

function addRole() {
  viewDepartments2();
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentId",
        message: "What is the department ID for this role?",
      },
      {
        type: "input",
        name: "newRole",
        message: "What is the name of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of this role?",
      },
    ])
    .then((answers) => {
      const newRole = answers.newRole;
      const salary = answers.salary;
      const departmentId = answers.departmentId;

      const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
      db.query(sql, [newRole, salary, departmentId], (err, response) => {
        if (err) throw err;
        console.log(
          `You have added ${newRole} with the salary of: ${salary} as a new role!`
        );
        exit();
      });
    });
}

function addEmployee() {
  viewRoles2();
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleId",
        message: "What is the role ID for this employee?",
      },
      {
        type: "input",
        name: "firstName",
        message: "What is the employees first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employees last name?",
      },
    ])
    .then((answers) => {
      const firstName = answers.firstName;
      const lastName = answers.lastName;
      const roleId = answers.roleId;
      const managerId = null;

      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
      db.query(
        sql,
        [firstName, lastName, roleId, managerId],
        (err, response) => {
          if (err) throw err;
          console.log(
            `You have added ${firstName} ${lastName} as an employee!`
          );
          exit();
        }
      );
    });
}

function updateEmployee() {
  viewEmployees2();
  viewRoles2();
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "What is the ID of the employee you wish to update?",
      },
      {
        type: "input",
        name: "updatedRole",
        message: "What is the role you want to assign to this employee?",
      },
    ])
    .then((answers) => {
      const employeeId = answers.employeeId;
      const updatedRole = answers.updatedRole;

      const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
      db.query(sql, [updatedRole, employeeId], (err, response) => {
        if (err) throw err;
        console.log(
          `You have updated the employee with the id of ${employeeId}`
        );
        exit();
      });
    });
}

function exit() {
  inquirer
    .prompt({
      type: "confirm",
      name: "continue",
      message: "Would you like to continue?",
      default: false,
    })
    .then((answer) => {
      if (answer.continue === true) {
        start();
      } else {
        db.end();
      }
    });
}

db.connect((err) => {
  if (err) throw err;
  console.log(`Connected to the Database! ${db.threadId}`);
  start();
});
