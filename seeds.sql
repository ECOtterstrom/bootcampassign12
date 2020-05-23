-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);

INSERT INTO company_db.employee
    (emplId, first_name, last_name, role_id, manager_id)
VALUES
    (1, "Adam", "Ant", 20, 1),
    (2, "Brenda", "Bear", 21, 1),
    (3, "Calvin", "Cat", 22, 2),
    (4, "Danielle", "Deer", 30, 3),
    (5, "Erik", "Elephant", 31, 4),
    (6, "Freida", "Fish", 32, 4),
    (7, "George", "Giraffe", 23, 2),
    (8, "Helena", "Hippo", 40, 7),
    (9, "Ian", "Iguana", 41, 8),
    (10, "Jane", "Jaguar", 42, 8);

INSERT INTO company_db.role
    (roleId, title, salary, department_id)
VALUES
    (20, "President", 100000, 100),
    (21, "Vice President", 95000, 100),
    (22, "Director_IT", 90000, 100),
    (30, "Manager_IT", 85000, 200),
    (31, "Programmer", 80000, 200),
    (32, "Analyst", 75000, 200),
    (23, "Director_HR", 90000, 100),
    (40, "Manager_HR", 85000, 300),
    (41, "Business Partner", 80000, 300),
    (42, "Recruiter", 75000, 300);

INSERT INTO company_db.department
    (deptId, name)
VALUES
    (100, "Executive_Mgt"),
    (200, "IT"),
    (300, "HR");
    
Select * from company_db.employee;
Select * from company_db.role;
Select * from company_db.department;

UPDATE company_db.employee
SET manager_id = null
WHERE emplid = 1