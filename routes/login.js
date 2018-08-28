const express = require('express');
const router = express.Router();

let User = require('../models/users');



// Login Page
router.get('/', function(req, res){
    res.render('login')
});

// Register Page
router.get('/register', function(req,res){
    res.render('register');
});

router.post('/register', function(req,res) {
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {
    
        var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf,
        }  
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
        if (err) {
            return next(err)
        } else {
            return res.redirect('/profile');
        }
        });
    }})  

router.get('/login', function(req, res){
    res.render('login')
})


module.exports = router;