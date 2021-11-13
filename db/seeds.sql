INSERT INTO  department (dName)
VALUES
    ('Infront of the Camera'),
    ('Behind the Camera');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Actor', 50000, 1),
    ('Gaffer', 40000, 2),
    ('Producer', 75000, 2),
    ('Extra', 30000, 1),
    ('Director', 70000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Randal', 'Baumer', 1, NULL),
    ('Casey', 'Romanin', 1, NULL),
    ('Tyler', 'Wall', 3, NULL),
    ('Bill', 'Myles', 4, NULL),
    ('Tim', 'Wright', 5, NULL),
    ('Celine', 'Chiturai', 3, NULL),
    ('Cierra', 'Weija', 2, NULL),
    ('Eric', 'Deroches', 4, NULL),
    ('Kurtis', 'Haupt', 4, NULL),
    ('Esther', 'Lee', 3, NULL);