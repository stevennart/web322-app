const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let Schema = mongoose.Schema;

let userSchema = new Schema({

    "userName": {
        "type": String,
        "unique": true
    },
    "password": String,
    "email": String,
    "loginHistory": [
        {
            "dateTime": Date,
            "userAgent": String
        }
    ]


});

let User; // to be defined on a new connection in initialize().


module.exports = {


    initialize: function () {

        return new Promise((resolve, reject) => {

            // "mongodb://<steve>:<test123>@ds000000.mlab.com:00000/web322-a6"
            let db = mongoose.createConnection("mongodb+srv://steven:steven123@web322a6-ey8ny.mongodb.net/test?retryWrites=true"); 

            db.on('error', err => {
                reject(err);
            });


            db.once('open', () => {
                User = db.model("users", userSchema);

                resolve();
            });

        });

    },

    registerUser: function (userData) {

        
        return new Promise((resolve, reject) => {

            // userData has userName, userAgent, email, password, password2 

            if (userData.password != userData.password2) {
                reject("Passwords do not match");
            }
            else {

                bcrypt.genSalt(10, function (err, salt) { 
                   
                    if (err) {
                        reject(`There was an error encrypting the password1`);
                    } 

                    bcrypt.hash(userData.password, salt, function (err, hash) { 
                        
                        if (err) {
                            //console.log(hash);
                            reject(`There was an error encrypting the password`);
                        }
                            
                        else {
                            userData.password = hash;

                            let newUser = new User(userData);

                            newUser.save()
                                .then(() => {
                                     resolve();
                                })
                                .catch(err => {
                                    if (err.code == 11000) {
                                        reject('User Name already taken.');
                                    }
                                    else if (err.code != 11000) {
                                        reject(`There was an error creating the user: ${err}`);
                                    }
                                });
                        }
                    
                    });
                
                 
                });

            }
            
        });

    },

    checkUser: function (userData) {

        return new Promise((resolve, reject) => {


            User.find({ userName: userData.userName })
            .exec()
            .then(users => {
                if (users.length == 0) { 
                    reject(`Unable to find user: ${userData.userName}`);
                }
                // if (users[0].password != userData.password) {
                //     reject(`Incorrect Password for user: ${userData.userName}`);
                // }
                else {

                    bcrypt.compare(userData.password, users[0].password).then((res) => {
                         
                        if (res === true) {

                            users[0].loginHistory.push({dateTime: (new Date()).toString(), userAgent: userData.userAgent});

                            User.update(
                            { userName: users[0].userName},
                            { $set: {loginHistory: users[0].loginHistory}}, 
                            {multi: false}
                            ).exec()
                            .then(() => {
                                resolve(users[0]);
                            })
                            .catch(err => {
                                reject(`There was an error verifying the user: ${err}`);
                            });

                        }
                        else {
                            reject(`Incorrect password for user: ${userData.userName}`);
                        }
                            
                        
                    });      

                }

              //  process.exit();
            })
            .catch(() => {
                reject(`Unable to find user: ${userData.userName}`);
            });

            
        });
    }

    
};