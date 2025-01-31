/*seeds.sql
Maya Li Bauer
January 30, 2025
*/

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;


/*Department Table*/
CREATE TABLE department (
    id SERIAL PRIMARY KEY, /*this is the identifier*/
    name VARCHAR(30) UNIQUE NOT NULL
);

/*Role Table*/
CREATE TABLE role (
    id SERIAL PRIMARY KEY,  /*this is the identifier*/
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) 
    REFERENCES  department(id)
);

/*Employee Table*/
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) 
    REFERENCES  role(id),
    FOREIGN KEY (manager_id)
    REFERENCES  employee(id)
);
