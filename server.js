var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "sevilla08",
    database: "employeesDB"
});
connection.connect(function (err) {
    if (err) throw err;
    start();

})
function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",

                "View All Roles",
                "Add Role",
                "Remove Role",

                "View All Departments",
                "Add Department",
                "Remove Department",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "View All Departments":
                    viewDepartments();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Remove Department":
                    removeDepartment();
                    break;
                case "Remove Role":
                    removeRole();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        });
}
function viewEmployees() {

    const queryString = `SELECT 
    employees.id, 
    employees.first_name,
    employees.last_name,
    roles.title,
    department.name,
    roles.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) as manager  
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN department
    ON roles.department_id = department.id
    LEFT JOIN employees manager
    ON manager.id = employees.manager_id;`

    connection.query(queryString, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewDepartments() {
    connection.query("SELECT * FROM department;", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();

    });
}

function viewRoles() {
    connection.query("SELECT * FROM roles;", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();

    });
}

function removeEmployee() {
    connection.query("SELECT * FROM employees;", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "choice",
                type: "rawlist",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].first_name);
                    }
                    return choiceArray;
                },
                message: "Which Employee do you want to remove?"
            },
            ])
            .then(function (answer) {
                connection.query("DELETE FROM employees WHERE first_name = ?", [answer.choice],
                    function (err) {
                        if (err) throw err;
                        console.log("Employee removed successfully");
                        start();
                    }
                );
            });
    });
}

function removeDepartment() {
    connection.query("SELECT name FROM department", function (err, result) {
        if (err) throw err;
        console.log("\n");
        console.table(result);

        var department = [];
        for (var i = 0; i < result.length; i++) {
            department.push(result[i].name)
        }
        inquirer.prompt([
            {
                type: "list",
                name: "removeDept",
                message: "Which department do you want to remove?",
                choices: department
            }
        ]).then(function (answer) {
            connection.query("DELETE from department WHERE name= ?", [answer.removeDept], function (err, res) {
                if (err) throw err;
                console.log("\n");
                console.table(res);
                console.log("Department has been removed!");
                start();

            });
        });

    });
}

function removeRole() {
    connection.query("SELECT title FROM roles", function (err, result) {
        if (err) throw err;
        console.log("\n");
        console.table(result);

        var roles = [];
        for (var i = 0; i < result.length; i++) {
            roles.push(result[i].title)
        }
        inquirer.prompt([
            {
                type: "list",
                name: "removeRole",
                message: "Which role do you want to remove?",
                choices: roles
            }
        ]).then(function (answer) {
            connection.query("DELETE from roles WHERE title= ?", [answer.removeRole], function (err, res) {
                if (err) throw err;
                console.log("\n");
                console.table(res);
                console.log("Role has been removed!");
                start();

            });
        });

    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of new employee? "
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of new employee?"
        },
        {
            type: "input",
            name: "newRoleID",
            message: "What is the role ID for the new employee?"
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO employees SET ?",
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.newRoleID

            },
            function (err, res) {
                if (err) throw err;
                console.log("\n");
                console.table(res);
                console.log("Your new employee has been added!");
                start();
            }
        );

    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "addDept",
            message: "What is the name of the department you want to add?"
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO department SET ?",
            {
                name: answer.addDept,
            },
            function (err, res) {
                if (err) throw err;
                console.log("\n");
                console.table(res);
                console.log("Your new department has been added!");
                start();
            }
        );
    });
}

function addRole() {
    inquirer
        .prompt([
            {
                name: "role_type",
                type: "input",
                message: "What would you like the new Role to be?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the expected salary?"
            },
            {
                name: "department",
                type: "input",
                message: "What will be the new department ID?"
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO roles(title, salary, department_id) VALUES (?,?,?) ", [answer.role_type, answer.salary, answer.department],
                function (err) {
                    if (err) throw err;
                    console.log("Added new role to database successfully");
                    start();
                }
            );
        });
}

function updateRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "updateLN",
            message: "What is the last name of the employee?"
        },
        {
            type: "number",
            default: 0,
            name: "newRole",
            message: "what is the new role id for the employee?"
        }
    ]).then(function (answer) {
        const getEmLN = answer.updateLN
        const changeEmpRole = answer.newRole
        connection.query("UPDATE employees SET? WHERE? ",
            [
                {
                    role_id: changeEmpRole
                },
                {
                    last_name: getEmLN
                }
            ],
            function (err, res) {
                if (err) throw err
                console.log("\n");
                console.table(res);
                console.log("Emplyees new role has been updated!")
                start();
            }
        );

    });
}


start();