
use employeesDB;

INSERT INTO department
    (name)
VALUES
    ('District Staff'),
    ('Management'),
    ('Deparment Heads'),
    ('Leads');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('District Manager', 170000, 1),
    ('District Coordinator', 90000, 1),
    ('Store Manager', 120000, 2),
    ('Assistant Store Manager', 80000, 2),
    ('Customer Service Manager', 50000, 3),
    ('Day Time Grocery Manager', 60000, 3),
    ('Dairy Lead', 45000, 4),
    ('Bookkeeper Lead', 40000, 4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Marcus', 'Martinez', 1, NULL),
    ('Aaron', 'Barta', 2, 1),
    ('Liza', 'Riley', 3, 1),
    ('Donovan', 'Davis', 4, 3),
    ('Brenda', 'Wolfe', 5, 3),
    ('Zahid', 'Kaskar', 6, 3),
    ('Cornelio', 'Sanchez', 7, 6),
    ('Jacky', 'White', 8, 5);