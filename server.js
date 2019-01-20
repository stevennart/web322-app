const express = require('express');
const app = express();
const path = require('path');
const data = require('./data-service.js');
const employeesJSON = require('./data/employees.json');
const departmentsJSON = require('./data/departments.json');

const http_port = process.env.PORT || 8080;


app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(`${__dirname}/views/home.html`));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(`${__dirname}/views/about.html`));
});

app.get("/employees", (req, res) => {
    res.json(employeesJSON);
});

app.get("/managers", (req, res) => {

    
    var final = [];
   for (let i = 0; i < employeesJSON.length; i++) {
        if (employeesJSON[i].isManager) {
           
            final.push(employeesJSON[i]);
        }
    }
    
    res.json(final);
});

app.get("/departments", (req, res) => {
    res.json(departmentsJSON);
});

 







app.listen(http_port, function () {
    console.log(`Express http server listening on port ${http_port}....`);
});