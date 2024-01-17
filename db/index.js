const connection = require("./connection");

class DB {
    constuctor(connection){
        this.connection = connection;
    }
    // Note: Uses promise() function to resolve promises created by queries
    // Get All Tables
    getTables() {
        return this.connection.promise().query(
            'SHOW TABLES;'
        );
    };
    
    // Department Calls

    // Get All
    getDepartments() {
        return this.connection.promise().query(
          "SELECT department.id, department.name FROM department;"
        );
    };


    // Create
    createDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
    };


    // Delete
    deleteDepartment(departmentId) {
        return this.connection.promise().query("DELETE FROM department WHERE id = ?", departmentId);
    };


    // Employee Calls

    // Get All
    getEmployees() {
        return this.connection.promise().query(
          "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    };

    // Create
    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    };


    // Delete
    removeEmployee(employeeId) {
        return this.connection.promise().query(
          "DELETE FROM employee WHERE id = ?",
          employeeId
        );
    };

    // Update(role)
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
          "UPDATE employee SET role_id = ? WHERE id = ?",
          [roleId, employeeId]
        );
    };


    // Roll Calls

    // Get All(with depts)
    getRoles() {
        return this.connection.promise().query(
          "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    };

    // Create
    createRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    };

    // Delete
    deleteRole(roleId) {
        return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
    }

}

module.exports = new DB(connection);