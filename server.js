/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Steven Tran Student ID: 105629174 Date: Jan 15th, 2019
*
* Online (Heroku) Link: 
*
********************************************************************************/ 


const express = require('express');
const app = express();
const path = require('path');
const data = require('./data-service.js');
//const employeesJSON = require('./data/employees.json'); no longer needed because data-service module took care of reading the file contents and putting it into an array of objects. 
//const departmentsJSON = require('./data/departments.json'); no longer needed because data-service module took care of reading the file contents and putting it into an array of objects. 
 
const http_port = process.env.PORT || 8080;

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(`${__dirname}/views/home.html`));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(`${__dirname}/views/about.html`));
});

app.get("/employees", (req, res) => {

    data.getAllEmployees().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({message: err});
    });

});

app.get("/managers", (req, res) => {


    data.getManagers().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({message: err});
    });

});

app.get("/departments", (req, res) => {
    
    data.getDepartments().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({message: err});
    });
    
});

app.use((req, res) => { // if route doesn't match anything above, do this.

    res.status(404).send(`
    
    <div style='display: flex; justify-content: center; align-items: center; height: 100%;'>
    
    <img src='https://cdn-images-1.medium.com/max/640/1*PayLNtfwPr4hIicJtwvVLA.png' alt='404img'>
    
    </div>
     
    
    `);

});


data.initialize().then((data) => {

    app.listen(http_port, function () {
        console.log(data);
        console.log(`Express http server listening on port ${http_port}....`);
    });

}).catch(() => {
    console.log(`No data was fetched, server failed to start up.`);
});
