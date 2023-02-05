const Chef = require("../models/Chef");
const Recipe = require("../models/Recipe");

exports.contactUS_create_post = (req, res) => {
    console.log(req.body);
    let contactUs = new contactUs(req.body);

exports.contactUS_get = (req, res) => {
    res.send("working on chefs file")

    // res.render("home/chef");
    // // res.send("Blog working on auth file")
}
}










exports.contactUs_get = (req, res) => {
    res.render("home/contactUs")
}