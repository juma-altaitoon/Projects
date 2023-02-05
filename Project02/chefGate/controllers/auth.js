// Require User
const User = require("../models/User")
// Require Passport
const passport = require('../helper/config');
const moment = require('moment');
//  Require bcrypt
const bcrypt = require("bcrypt");
const salt = 10;

exports.auth_get = (req, res) => {
    res.send("working on auth file")
}
// SignUp - GET
exports.auth_signup_get = (req, res) => {
    res.render("auth/signup");
}
// SignUp - POST 
exports.auth_signup_post = (req, res) => {
    console.log(req.body.userRole);
    let user = new User(req.body);
    
    let hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash)// To Check Hash password in database matches
    user.password = hash;

    // Save user to database
    user.save()
    .then (() => {
        res.redirect('/auth/login');
    })
    .catch(err => {
        console.log(err);
        res.send("Error...Try again later");
    })
}
//  LogIn - GET
exports.auth_login_get = (req,res) => {
    res.render("auth/login");
}

// LogIn - POST
exports.auth_login_post = 
    passport.authenticate("local", {
        successRedirect: "/auth/dashboard",
        failureRedirect: "/auth/login",
    });
// Dashboard  - GET
exports.auth_dashboard_get = (req,res) =>{
    res.render("auth/dashboard")
} 

//  LogOut - GET
exports.auth_logout_get = (req, res) => {
    // Exit Session 
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect("/")
    });
}

// User Index
exports.user_index_get = (req,res)=>{
    User.find()
    .then(user => {
        res.render("auth/index", {user})
    })
    .catch((err)=> {
        console.log(err);
    })
}

// User Page
exports.user_details_get = (req, res) => {
    User.findById(req.query.id)
    .then(user => {
        res.render('chef/details', {user, moment});
    })
    .catch(err => {
        console.log(err);
    })
}

// Edit -GET
exports.auth_edit_get = (req,res) => {
    User.findById(req.query.id).populate('recipe')
    .then(user => {
        res.render("chef/edit", {user});
    })
    .catch(err => {
        console.log(err);
    })
}

//  Update
exports.auth_update_put = (req, res) => {
    User.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/auth/dashboard");
    })
    .catch(err => {
        console.log(err);
    })
}


