DROP DATABASE IF EXISTS company_db;

CREATE database company_db;

USE company_db;

CREATE TABLE department (
  deptId INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (deptId)
);
CREATE TABLE role (
    roleId INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10 , 4 ) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (roleId),
    FOREIGN KEY (department_id) REFERENCES department(deptID)
);
CREATE TABLE employee (
  emplId INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL, 
  manager_id INT,
  PRIMARY KEY (emplId),
  FOREIGN KEY (manager_id) REFERENCES employee(emplID),
  FOREIGN KEY (role_id) REFERENCES role(roleId)
);













