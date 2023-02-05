const Chef = require("../models/Chef");
const Recipe = require("../models/Recipe");

exports.blog_create_post = (req, res) => {
    console.log(req.body);
    let blog = new blog(req.body);
}
exports.blog_get = (req, res) => {

    res.render("home/blog");
    // res.send("Blog working on auth file")
}

