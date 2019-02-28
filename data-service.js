const fs = require("fs"); // require fs module to work with file reading.

let employees = []; // used to send the array of employees objects to the client

let departments = []; // used to send the array of departments objects to the client

module.exports = {
  initialize: function () {
    // done

    return new Promise((resolve, reject) => {
      fs.readFile("./data/employees.json", (err, data) => {
        if (err) {
          reject("unable to read file");
        }

        result = JSON.parse(data);

        result.forEach((element) => {

          employees.push(element);

        });

        // for (let i = 0; i < result.length; i++) {
        //   employees.push(result[i]);
        // }
      });

      fs.readFile("./data/departments.json", (err, data) => {
        if (err) {
          reject("unable to read file");
        }

        result = JSON.parse(data); // parses the read file content and stores it into an array, and then loop through array to push into the departments array created above.

        result.forEach((element) => {

          departments.push(element);

        });

        // for (let i = 0; i < result.length; i++) {
        //   departments.push(result[i]);
        // }
      });

      resolve("success");
    });
  },

  getAllEmployees: function () {
    // done

    return new Promise((resolve, reject) => {
      if (employees.length === 0) {
        reject("no results returned");
      } else {
        resolve(employees);
      }
    });
  },

  addEmployee: function (employeeData) {
    // done

    return new Promise((resolve, reject) => {
      if (!employeeData.isManager) {
        employeeData.isManager = false;
      } else {
        employeeData.isManager = true;
      }

      employeeData.employeeNum = employees.length + 1;

      employees.push(employeeData);

      resolve("employee added");

      if (employees.length === 0) {
        reject("no results returned");
      }
    });
  },

  updateEmployee: function (employeeData) {

    return new Promise((resolve, reject) => {

      employeeData.isManager = (employeeData.isManager) ? true : false;

      employees.forEach((element) => {

        if (element.employeeNum == employeeData.employeeNum) {


          employees.splice(employeeData.employeeNum - 1, 1, employeeData);
          // element = employeeData;
           console.log(employeeData);
          // console.log(em) 
          resolve();
        }
        // else {
        //   reject("failed to update employee");
        // }
        
      })
      

    });
    
  },



  getEmployeesByStatus: function (status) {
    // done

    return new Promise((resolve, reject) => {
      let employeeStatus = []; // a filter of all employees that has a pt/ft status

      // for (let i = 0; i < employees.length; i++) {
      //   if (employees[i].status == status) {
      //     employeeStatus.push(employees[i]);
      //   }
      // }

      employees.forEach((element) => {
        if (element.status == status) {
          employeeStatus.push(element);
        }
      });

      if (employeeStatus.length === 0) {
        reject("no results returned");
      }

      resolve(employeeStatus);
    });
  },

  getEmployeeByNum: function (num) {
    // done

    return new Promise((resolve, reject) => {
      let empByNum = []; // filters a single employee's employeeNum that matches the num

      // for (let i = 0; i < employees.length; i++) {
      //   if (employees[i].employeeNum == num) {
      //     empByNum = employees[i];
      //   }
      // }

      employees.forEach((element) => {
        if (element.employeeNum == num) {
          empByNum = element; 
        }
      });

      if (empByNum.length == 0) {
        reject("no results returned");
      }

      resolve(empByNum);
    });
  },

  getManagers: function () {
    return new Promise((resolve, reject) => {
      var managers = []; // used to send the array of manager objects to the client

      for (let i = 0; i < employees.length; i++) {
        if (employees[i].isManager) {
          managers.push(employees[i]);
        }
      }

      if (managers.length === 0) {
        reject("no results returned");
      } else {
        resolve(managers);
      }
    });
  },

  getEmployeesByManager: function (manager) {
    // done

    return new Promise((resolve, reject) => {
      var empByManager = []; // a filter of all employees's managerNum that matches the manager #

      // for (let i = 0; i < employees.length; i++) {
      //   if (employees[i].employeeManagerNum == manager) {
      //     empByManager.push(employees[i]);
      //   }
      // }

      employees.forEach((element) => {
        if (element.employeeManagerNum == manager) {
          empByManager.push(element);
        }
      });

      if (empByManager.length == 0) {
        reject("no results returned");
      }

      resolve(empByManager);
    });
  },

  getDepartments: function () {
    return new Promise((resolve, reject) => {
      if (departments.length === 0) {
        reject("no results returned");
      } else {
        resolve(departments);
      }
    });
  },

  getEmployeesByDepartment: function (department) {
    // done

    return new Promise((resolve, reject) => {
      let departmentNum = []; // a filter of all employes that has a matching department id

      employees.forEach((element) => {
        if (element.department == department) {
          departmentNum.push(element);
        }
      });

      if (departmentNum.length == 0) {
        reject("no results returned");
      }

      resolve(departmentNum);
    });
  }
};