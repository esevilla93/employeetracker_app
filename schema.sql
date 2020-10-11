DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;



CREATE TABLE department(
 id int NOT NULL AUTO_INCREMENT,
 name VARCHAR(30),
 PRIMARY KEY (id)
);

CREATE TABLE roles (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(30),
    salary DECIMAL (10, 4) NOT NULL,
    department_id INT(10),
    PRIMARY KEY (id)
);

CREATE TABLE employees (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id  INT(10) NOT NULL,
  manager_id INT(10),
  PRIMARY KEY (id)
);