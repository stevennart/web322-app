const Sequelize = require('sequelize');

var sequelize = new Sequelize('d8l3apv6bkbf7e', 'fwniybmmtbfdls', '3faf7469ecac7b84484d1f1faefdbb8bbcc80d8787d222e019a9bf258ffe5c2b', {
  host: 'ec2-23-23-195-205.compute-1.amazonaws.com',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: true
  }
});

const Employee = sequelize.define('Employee', {
  employeeNum: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  SSN: Sequelize.STRING,
  addressStreet: Sequelize.STRING,
  addressCity: Sequelize.STRING,
  addressState: Sequelize.STRING,
  addressPostal: Sequelize.STRING,
  martialStatus: Sequelize.STRING,
  isManager: Sequelize.BOOLEAN,
  employeeManagerNum: Sequelize.INTEGER,
  status: Sequelize.STRING,
  department: Sequelize.INTEGER,
  hireDate: Sequelize.STRING,
});

const Department = sequelize.define('Department', {
  departmentId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  departmentName: Sequelize.STRING
});

module.exports = {




  initialize: function () {

    return new Promise((resolve, reject) => {

      sequelize.sync()
        .then(() => {  resolve(); })
        .catch(() => { reject("unable to sync the database"); });
    });
 
  },

  getAllEmployees: function () {
    
    return new Promise((resolve, reject) => {
   
      sequelize.sync()
        .then(() => {
          Employee.findAll()
            .then(function (data) {
              resolve(data);
            }).catch(function () {
              reject("no results returned");
            })
        })
        .catch((err) => {
          reject("Unable to sync the database");
        })


    });
  },

  addEmployee: function (employeeData) {

    employeeData.isManager = (employeeData.isManager) ? true : false;

    return new Promise((resolve, reject) => {
      Employee.create(employeeData)
        .then(() => resolve())
        .catch(() => reject("unable to create employee"))
    });
   
  },
 
  updateEmployee: function (employeeData) {

    employeeData.isManager = (employeeData.isManager) ? true : false;
    
    return new Promise((resolve, reject) => {
      Employee.update(employeeData, {
          where: {
            employeeNum: employeeData.employeeNum
          }
        })
        .then(() => resolve(Employee.update(employeeData, {
          where: {
            employeeNum: employeeData.employeeNum
          }
        })))
        .catch(() => reject("unable to update employee"))
    });

  },

  getEmployeesByStatus: function (status) {
    
    return new Promise((resolve, reject) => {
     
      sequelize.sync()
        .then(() => {
          Employee.findAll({
              
              where: {
                status: status
              }

            })
            .then(function (data) { resolve(data); })
            .catch(function () {  reject("no results returned"); }) })
        .catch((err) => { reject("Unable to sync data");  })

    });
  },

  getEmployeeByNum: function (num) {
            
    return new Promise((resolve, reject) => {
     
      Employee.findAll({
        where: {
          employeeNum: num
        }
      })
      .then((data) => {  resolve(data[0]); })
      .catch(() => {  reject("no results returned"); })

    });
  },

  // getManagers: function () {
  //   return new Promise((resolve, reject) => {
  //     // var managers = []; // used to send the array of manager objects to the client

  //     // for (let i = 0; i < employees.length; i++) {
  //     //   if (employees[i].isManager) {
  //     //     managers.push(employees[i]);
  //     //   }
  //     // }

  //     // if (managers.length === 0) {
  //     //   reject("no results returned");
  //     // } else {
  //     //   resolve(managers);
  //     // }

  //     reject();

  //   });
  // },

  getEmployeesByManager: function (manager) {
  
    return new Promise((resolve, reject) => {
      Employee.findAll({
          where:{
              employeeManagerNum: manager
          }
      })
      .then(()=>resolve(Employee.findAll({
          where:{
              employeeManagerNum: manager
          }
      })))
      .catch(()=>reject("no results returned")) 
     
    });       
    
  },

  getDepartments: function () {

    return new Promise((resolve, reject) => {
      Department.findAll()
        .then(() => resolve(Department.findAll()))
        .catch(() => reject("no results returned"))
    });

  },

  getEmployeesByDepartment: function (department) {
    
    return new Promise((resolve, reject) => {

      sequelize.sync().then(() => {
        Employee.findAll({
          where: {
            department: department
          }
        })
        .then((data) => { resolve(data); })
        .catch((err) => { reject("no results returned"); })
      })

    });
  },

  addDepartment: function (departmentData) {

    return new Promise((resolve, reject) => {

      sequelize.sync().then(function () {
        Department.create({
          departmentName: departmentData.departmentName
        })
      }).then(function (data) {  resolve(data); })
      .catch(function () { reject("unable to create department"); })
    })


  },

  updateDepartment: function (departmentData) {

    return new Promise((resolve, reject) => {

      Department.update(departmentData, {
          where: {
            departmentId: departmentData.departmentId
          }
        })
        .then(() => resolve(Department.update(departmentData, 
          {
          where: {
            departmentId: departmentData.departmentId
          } 
          }
          )))
        .catch(() => reject("unable to update department"));
    });
 
  },

  getDepartmentById: function (id) {

    return new Promise((resolve, reject) => {
      Department.findAll({
          where: {
            departmentId: id
          }
        })
        .then(() => resolve(Department.findAll({
          where: {
            departmentId: id
          }
        })))
        .catch(() => reject("no results returned"))
    });




  },

  deleteEmployeeByNum: function (empNum) {
    return new Promise((resolve, reject) => {

      Employee.destroy({

        where: {
          employeeNum: empNum
        }

      })
      .then(() => { resolve(); })
      .catch(() => { reject("Fail to delete"); })

    });

  }


};