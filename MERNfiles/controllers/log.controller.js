const model = require("../models/model").OU;
const jwt = require('jsonwebtoken');
const {response} = require("express");
const nodemailer = require('nodemailer');
const request = require("request");

//ALL CRUD ACTIONS GO HERE

//find data in mongoDB when signing in
const getOneTest = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let password = req.params.password;
    let username = req.params.username;
    let email = req.params.email;
    //check if data exists else give error
    model.findOne({password: password, username: username, email:email}, (err, data) => {
        if (err || !data) {
            return res.send("Some details doesn't exist");
        }
        //if data exists, check if they are technical user and if email updates should be weekly
        else if(data) {
            model.findOne({password: password, username: username, email:email, technical:"yes",updates:"weekly"}, (err, data) => {
                //if data found, jwt.sign token with technical key and send token to frontend (used to store in session storage)
                if(data) {
                    jwt.sign({username,password}, 'technical_user', {expiresIn: '10h'}, (err, token) => {
                        res.send(token);
                        console.log(token);
                        console.log("Technical user");
                        console.log("weekly")

                        //request weekly email api
                        let request = require('request');
                        let options = {
                            'method': 'GET',
                            'url': 'http://localhost:3001/weeklyEmail/' + email,
                            'headers': {
                                'Authorization': 'Bearer ' + token
                            }
                        };
                        request(options, function (error, response) {
                            if (error) throw new Error(error);
                            console.log(response.body);
                        });
                    })
                }
                //check if user is technical and if email updates should be daily
                else{
                    model.findOne({password: password, username: username, email:email, technical:"yes",updates:"daily"}, (err, data) => {
                        if(data) {
                            jwt.sign({username, password}, 'technical_user', {expiresIn: '10h'}, (err, token) => {
                                //if data found, jwt.sign token with technical key and send token to frontend (used to store in session storage)
                                res.send(token);
                                console.log(token);
                                console.log("Technical user");
                                console.log("daily")


                                //request daily email api
                                let request = require('request');
                                let options = {
                                    'method': 'GET',
                                    'url': 'http://localhost:3001/dailyEmail/' + email,
                                    'headers': {
                                        'Authorization': 'Bearer ' + token
                                    }
                                };
                                request(options, function (error, response) {
                                    if (error) throw new Error(error);
                                    console.log(response.body);
                                });
                            })
                        }
                        else{
                            //check if user is non-technical and if email updates should be weekly
                            model.findOne({password: password, username: username, email:email, technical:"no",updates:"weekly"}, (err, data) => {
                                if(data){
                                    //if data found, jwt.sign token with non-technical key and send token to frontend (used to store in session storage)
                                    jwt.sign({username, password}, 'non_technical_user', {expiresIn: '10h'}, (err, token) => {
                                        res.send(token);
                                        console.log(token);
                                        console.log("Non Technical user");
                                        console.log("weekly")

                                        //request weekly email api
                                        let request = require('request');
                                        let options = {
                                            'method': 'GET',
                                            'url': 'http://localhost:3001/weeklyEmail/' + email,
                                            'headers': {
                                                'Authorization': 'Bearer ' + token
                                            }
                                        };
                                        request(options, function (error, response) {
                                            if (error) throw new Error(error);
                                            console.log(response.body);
                                        });
                                    })
                                }
                                //check if user is non-technical and if email updates should be daily
                                else{
                                    model.findOne({password: password, username: username, email:email, technical:"no",updates:"daily"}, (err, data) => {
                                        if(data){
                                            //if data found, jwt.sign token with non-technical key and send token to frontend (used to store in session storage)
                                            jwt.sign({username, password}, 'non_technical_user', {expiresIn: '10h'}, (err, token) => {
                                                res.send(token);
                                                console.log(token);
                                                console.log("Non Technical user");
                                                console.log("daily")

                                                //request daily email api
                                                let request = require('request');
                                                let options = {
                                                    'method': 'GET',
                                                    'url': 'http://localhost:3001/dailyEmail/' + email,
                                                    'headers': {
                                                        'Authorization': 'Bearer ' + token
                                                    }
                                                };
                                                request(options, function (error, response) {
                                                    if (error) throw new Error(error);
                                                    console.log(response.body);
                                                });
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    });
};



//Add data to mongodb when registering
const newTest = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //check if data already exists in mongodb
    model.findOne({username: req.params.username, email:req.params.email}, (err, data) => {
        //if data not in mongodb, add it
        if (!data) {
            //create a new data object using the model and req.params
            const newTest = new model({
                username: req.params.username,
                password: req.params.password,
                email: req.params.email,
                technical: req.params.technical,
                updates: req.params.updates,
            })
            //input validation, check if technical is yes or no and if updates are daily or weekly
            //if everything is correct, add data to mongodb
            if((req.params.technical === "yes" || req.params.technical === "no") && (req.params.updates === "daily" || req.params.updates === "weekly")){
                // save this object to database
                newTest.save((err, data) => {
                    if (err) return res.send("Some details already exists");
                    return res.send(data);
                })
            }
            //if input is wrong, give error
            else {
                return res.send("Technical must be 'yes' or 'no'.Updates must be 'daily' or 'weekly'");
            }
        }
        //if there's an error or the data is in mongodb, return a message
        else {
            if (err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.send("Some details already exists");
        }
    })
};



//export controller functions
module.exports = {
    getOneTest,
    newTest
};





