const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('../routes/route')
const mongoose = require('mongoose');
const request = require("request");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
app.use(express.json());
require('dotenv').config();
app.use('/', routes);
app.use(bodyParser.json());
app.use(cors())



//establish connection to database
mongoose.connect(
    process.env.MONGODB_URI,
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);



//Crypto API
app.get('/crypto',verifyToken,(req, res) => {

    res.set('Access-Control-Allow-Origin', '*');

    //verify user,if technical user send up to 200 crypto
    jwt.verify(req.token, 'technical_user', (err, authData) => {
        if (!err) {
            let request = require('request');
            let options = {
                'method': 'GET',
                'url': 'https://api.coinstats.app/public/v1/coins?skip=0&limit=200&currency=USD',
                'headers': {
                }
            };

            request(options, function (error, response) {
                if (error) throw new Error(error);
                res.send(response.body);
            });
        }
        //verify user,if non-technical user send up to 1 crypto
        else{
            jwt.verify(req.token, 'non_technical_user', (err, authData) => {
            let request = require('request');
            let options = {
                'method': 'GET',
                'url': 'https://api.coinstats.app/public/v1/coins?skip=0&limit=1&currency=USD',
                'headers': {}
                    };

            request(options, function (error, response) {
                if (error) throw new Error(error);
                res.send(response.body);
            })
            })
        }
    })
});



//Stock Market API
app.get('/stocks/:input',verifyToken,(req, res) => {
    //verify user,if technical user send stock data for inputted company
    jwt.verify(req.token, 'technical_user', (err, authData) => {
        if (!err) {
            let request = require('request');
            let options = {
                'method': 'GET',
                'url': 'https://finnhub.io/api/v1/quote?symbol=' + req.params.input + '&token=c7bjnuaad3ia366fvb50',
                'headers': {}
            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                res.send('[' + response.body + ']');
            });
        }
        //verify user,if non-technical user send no stock data (will display non-technical user)
        else{
            jwt.verify(req.token, 'non_technical_user', (err, authData) => {
                res.send([{
                    "c": "non tech user",
                    "h": "non tech user",
                    "l": "non tech user",
                    "o": "non tech user",
                    "pc": "non tech user",
                }])
            })
        }
    })
});



//Market News API
app.get('/market/:input',verifyToken,(req, res) => {
    //verify user,if technical user send market data for inputted company
    jwt.verify(req.token, 'technical_user', (err, authData) => {
        if(!err) {
            let request = require('request');
            let options = {
                'method': 'GET',
                'url': 'https://finnhub.io/api/v1/company-news?symbol=' + req.params.input + '&from=2021-09-01&to=2022-01-29&token=c7bjnuaad3ia366fvb50',
                'headers': {}
            };

            res.set('Access-Control-Allow-Origin', '*');
            request(options, function (error, response) {
                if (error) throw new Error(error);
                res.send(response.body);
            });
        }
        //verify user,if non-technical user send no market data (will display non-technical user)
        else{
            res.send([{
                "headline": "Only technical users can view headline",
                "summary": "Only technical users can view summary",
                "url": "Only technical users can view url"
            }])
        }
    });
});



//Daily automated email API
app.get('/dailyEmail/:email',verifyToken,(req, res) => {

    res.set('Access-Control-Allow-Origin', '*');

    //verify user,if technical user send api data via email
    jwt.verify(req.token, 'technical_user', (err, authData) => {
        if(!err){
            let request = require('request');
            let options = {
                'method': 'GET',
                'url': 'https://api.coinstats.app/public/v1/coins?skip=0&limit=200&currency=USD',
                'headers': {
                }
            };

            request(options, function (error, response) {
                if (error) throw new Error(error);

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "timothylang6@gmail.com",
                        pass:  process.env.EMAIL_PASS
                    }
                });
                let mailOptions = {
                    from: "timothylang6@gmail.com",
                    to: req.params.email,
                    subject: 'Latest Crypto Data',
                    text: response.body
                };

                //daily schedule for nodemailer, send api data on a daily basis
                cron.schedule('0 0 * * *',  () => {
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    })
                })
            })
        }
        //verify user,if technical user send api data via email
        else{
            jwt.verify(req.token, 'non_technical_user', (err, authData) => {
                if (!err){
                    let request = require('request');
                    let options = {
                        'method': 'GET',
                        'url': 'https://api.coinstats.app/public/v1/coins?skip=0&limit=200&currency=USD',
                        'headers': {
                        }
                    };

                    request(options, function (error, response) {
                        if (error) throw new Error(error);

                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: "timothylang6@gmail.com",
                                pass: process.env.EMAIL_PASS
                            }
                        });
                        let mailOptions = {
                            from: "timothylang6@gmail.com",
                            to: req.params.email,
                            subject: 'Latest Crypto Data',
                            text: response.body
                        };

                        //daily schedule for nodemailer, send api data on a daily basis
                        cron.schedule('0 0 * * *',  () => {
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            })
                        })
                    })
                }
            })
        }
    })
});



//Weekly automated emails API
app.get('/weeklyEmail/:email',verifyToken,(req,res)=>{

    res.set('Access-Control-Allow-Origin', '*');

    //verify user,if technical user send api data via email
    jwt.verify(req.token, 'technical_user', (err, authData) => {
        if(!err){
            let request = require('request');
            let options = {
                'method': 'GET',
                'url': 'https://api.coinstats.app/public/v1/coins?skip=0&limit=200&currency=USD',
                'headers': {
                }
            };

            request(options, function (error, response) {
                if (error) throw new Error(error);

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "timothylang6@gmail.com",
                        pass: process.env.EMAIL_PASS
                    }
                });
                let mailOptions = {
                    from: "timothylang6@gmail.com",
                    to: req.params.email,
                    subject: 'Latest Crypto Data',
                    text: response.body
                };

                //weekly schedule for nodemailer, send api data on a weekly basis
                cron.schedule('0 0 * * 0',  () => {
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    })
                })
            })
        }
        //verify user,if non-technical send api data via emal
        else{
            jwt.verify(req.token, 'non_technical_user', (err, authData) => {
                if (!err){
                    let request = require('request');
                    let options = {
                        'method': 'GET',
                        'url': 'https://api.coinstats.app/public/v1/coins?skip=0&limit=200&currency=USD',
                        'headers': {
                        }
                    };

                    request(options, function (error, response) {
                        if (error) throw new Error(error);

                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: "timothylang6@gmail.com",
                                pass: process.env.EMAIL_PASS
                            }
                        });
                        let mailOptions = {
                            from: "timothylang6@gmail.com",
                            to: req.params.email,
                            subject: 'Latest Crypto Data',
                            text: response.body
                        };

                        //weekly schedule for nodemailer, send api data on a weekly basis
                        cron.schedule('0 0 * * 0',  () => {
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            })
                        })
                    })
                }
            })
        }
    })
});



//Checks if token is verified
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}



app.get('/',(req, res) =>{
    res.set('Access-Control-Allow-Origin', '*');
    res.send("Welcome to my server");
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

