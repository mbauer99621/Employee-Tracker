/*seeds.sql
Maya Li Bauer
January 30, 2025
*/

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
    REFERENCES  (department_id)
);

/*Employee Table*/
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) 
    REFERENCES  (role_id),
    FOREIGN KEY (manager_id)
    REFERENCES (manager_id)
);
