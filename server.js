const db = require('./db/connection');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3001;

// questions we must answer
// 'View All Departments'
// 'View All Roles'
// 'View All Employees'
// 'Add a Department'
// 'Add a Role'
// 'Add a Employee'
// 'Update an Employee'




db.connect(err => {
    if (err) throw err;
    console.log(`Connected to the Database! ${db.threadId}`);
    start();
})

function start () {
    var select = `SELECT * FROM employee`;
    db.query(select, function (err, response) {
        if (err) throw err;
        console.table(response);
    })
}


// switch (answer) {
//   case "See All Employess":
//     seeEmployee();
//     break;
//   case "Add An Employee":
//     addEmployee();
//     break;
//   case "quit":
//     quit();
//     break;
//   case "Add An Employee":
//     addEmployee();
// }
