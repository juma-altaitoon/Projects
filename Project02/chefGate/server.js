const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config(); //dotenv is installed
const port= process.env.PORT;
const app = express();


// const bcrypt = require('bcrypt');

//To look for F.E files//static files: app.use(express.static(path.join(__dirname,'views')));

//To look for F.E files

app.use(express.static("public"));

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

const session = require('express-session');
const passport = require('./helper/config');

app.set("view engine", "ejs");

app.use(session ({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 400000000}
}
));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})


//Import and mount routes
const indexRoute = require('./routes/index');
app.use('/', indexRoute);
const aboutUsRoute = require('./routes/aboutUs');
app.use('/', aboutUsRoute);
const contactUsRoute = require('./routes/contactUs');
app.use('/', contactUsRoute);
const recipeRoute = require("./routes/recipes")
app.use('/', recipeRoute);
const blogRoute = require('./routes/blog');
app.use('/', blogRoute);
const chefRoute = require('./routes/chefs');
app.use('/', chefRoute);
const authRoute = require('./routes/auth');
app.use('/', authRoute);



mongoose.set('strictQuery', false);

mongoose.connect(process.env.mongoDBURL,
    {useNewUrlParser: true, useUnifiedTopology: true},
    ()=> {
        console.log("Connected to MongoDB!")
    });

app.listen(port,() => {
    console.log("app is running");
});

