-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);

INSERT INTO company_db.employee
    (emplId, first_name, last_name, role_id, manager_id)
VALUES
    (1000, "Adam", "Ant", 500, 1000),
    (1001, "Brenda", "Bear", 501, 1000),
    (1002, "Calvin", "Cat", 502, 1001),
    (1003, "Danielle", "Deer", 503, 1002),
    (1004, "Erik", "Elephant", 504, 1003),
    (1005, "Freida", "Fish", 505, 1003),
    (1006, "George", "Giraffe", 506, 1002),
    (1007, "Helena", "Hippo", 507, 1006),
    (1008, "Ian", "Iguana", 508, 1007),
    (1009, "Jane", "Jaguar", 509, 1007);

INSERT INTO company_db.role
    (roleId, title, salary, department_id)
VALUES
    (500, "President", 100000, 100),
    (501, "Vice President", 95000, 100),
    (502, "Director_IT", 90000, 101),
    (503, "Manager_IT", 85000, 101),
    (504, "Programmer", 80000, 101),
    (505, "Analyst", 75000, 101),
    (506, "Director_HR", 90000, 102),
    (507, "Manager_HR", 85000, 102),
    (508, "Business Partner", 80000, 102),
    (509, "Recruiter", 75000, 102);

INSERT INTO company_db.department
    (deptId, name)
VALUES
    (100, "Executive_Mgt"),
    (101, "IT"),
    (102, "HR");
    
Select * from company_db.employee;
Select * from company_db.role;
Select * from company_db.department;

UPDATE company_db.employee
SET manager_id = null
WHERE emplid = 1