/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Steven Tran Student ID: 105629174 Date: Jan 15th, 2019
*
* Online (Heroku) Link: https://a2-steven.herokuapp.com/
*
********************************************************************************/ 

const fs = require('fs'); // require fs module to work with file reading. 

var employees = []; // used to send the array of employees objects to the client 
var managers = []; // used to send the array of manager objects to the client 
var departments = []; // used to send the array of departments objects to the client 
let employeeStatus = [];
let departmentNum = [];
let empByManager = [];
let empByNum = [];

 

module.exports.getEmployeesByStatus = function (status) {
    return new Promise((resolve, reject) => {
        
        if (employees.length === 0) {
            reject("no results returned");
        }
        else {
            
            for (let i = 0; i < employees.length; i++) {
                if (employees[i].status == status) {
                    employeeStatus.push(employees[i]);
                } 
            }


            // employees.forEach((element, index) => {
                
            //     if (element[index].status === status) {
            //         employeeStatus.push(element[index]);
            //     }

            // }); 

            resolve(employeeStatus);
        }

    });
   
};

module.exports.getEmployeesByDepartment = function (department) {
    return new Promise((resolve, reject) => {
        
        if (departments.length === 0) {
            reject("no results returned");
        }
        else {
            
            departments.forEach((element, index) => {
                
                if (element[index].departmentId === department) {
                    departmentNum.push(element[index]);
                }

            }); 

            resolve(departmentNum);
        }

    });
   
};

module.exports.getEmployeesByManager = function (manager) {
    return new Promise((resolve, reject) => {
        
        if (employees.length === 0) {
            reject("no results returned");
        }
        else {
            
            employees.forEach((element, index) => {
                
                if (element[index].employeeManagerNum === manager) {
                    empByManager.push(element[index]);
                }

            }); 

            resolve(empByManager);
        }

    });
   
};

module.exports.getEmployeeByNum = function (num) {
    return new Promise((resolve, reject) => {
        
        if (employees.length === 0) {
            reject("no results returned");
        }
        else {
            
            // employees.forEach((element, index) => {
                
            //     if (element[index].employeeNum === num) {
            //         empByNum.push(element[index]);
            //     }

            // }); 


            for (let i = 0; i < employees.length; i++) {
                if (employees[i].employeeNum === num) {
                    empByNum.push(employees[i]);
                }
            }

            resolve(empByNum);
        }

    });
   
};


module.exports.addEmployee = function (employeeData) {

    return new Promise((resolve, reject) => {

        // try {

        // } catch(ex) {
        //     reject(ex.stack);
        // }
        
        if (employeeData.isManager === undefined) {
            employeeData.isManager = false;
        }
        else {
            employeeData.isManager = true;
        }

        employeeData.employeeNum = (employees.length + 1);
        employees.push(employeeData);
        resolve("employee added");
        
    });


};


module.exports.initialize = function () {

    fs.readFile('./data/employees.json', (err, data) => {

        result = JSON.parse(data);

        for (let i = 0; i < result.length; i++) {
            employees.push(result[i]);
        }

    });

    fs.readFile('./data/departments.json', (err, data) => {

        result = JSON.parse(data); // parses the read file content and stores it into an array, and then loop through array to push into the departments array created above. 

        for (let i = 0; i < result.length; i++) {
            departments.push(result[i]);
        }

    });

    return new Promise((resolve, reject) => {

        resolve("success");
        reject("unable to read file");
    });


};

module.exports.getAllEmployees = function () {

    return new Promise((resolve, reject) => {

        if (employees.length === 0) {
            reject("no results returned");
        } else {
            resolve(employees);
        }

    });



};

module.exports.getManagers = function () {

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].isManager) {

            managers.push(employees[i]);
        }
    }

    return new Promise((resolve, reject) => {

        if (managers.length === 0) {
            reject("no results returned");
        } else {
            resolve(managers);
        }
    });


};

module.exports.getDepartments = function () {

    return new Promise((resolve, reject) => {

        if (departments.length === 0) {
            reject("no results returned");
        } else {
            resolve(departments);
        }

    });

};