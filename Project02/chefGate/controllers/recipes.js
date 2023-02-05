
const Recipe = require("../models/Recipe");
const moment = require('moment');
const User = require("../models/User");
const { render } = require("ejs");
// GET
exports.recipes_get = (req, res) => {
    res.render("home/recipe");
}
// Load Recipe Add - GET
exports.recipe_add_get = (req, res) =>{
    Recipe.find().populate('chef')
    .then(recipe => {
        res.render("recipe/add", {recipe})
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.recipes_index_get = (req, res) => {
    Recipe.find()
    .then(recipes => {
        res.render('recipe/index', {recipes, moment})
    })
    .catch((err)=> {
        console.log(err);
    })
}
//  Recipe page by Id - GET
exports.recipe_details_get = (req, res) => {
    Recipe.findById(req.query.id).populate('chef')
    .then(recipe => {
        res.render('recipe/details', {recipe , moment})    
    })
    .catch(err => {
        console.log(err)
    })
}
//  Edit Recipe - GET
exports.recipe_edit_get = (req, res) => {
    Recipe.findById(req.query.id)
    .then(recipe =>{
        res.render("recipe/edit", {recipe, moment})
    })
    .catch(err => {
        console.log(err);
    })  
}

// exports.recipe_create_post = (req, res) => {
//     console.log(req.body);
//     let recipe = new recipe(req.body);
// }

//  My Recipes Index - GET
exports.myrecipes_index_get = (req, res) => {
    Recipe.find().populate('chef')
    .then(recipes => {
        res.render("recipe/myrecipes", {recipes, moment})
    })
    .catch((err)=> {
        console.log(err);
    })
}

exports.recipe_delete_get = (req, res) => {
    Recipe.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect("/recipe/myrecipes");
    })
    .catch(err => {
        console.log(err);
    })
};


// POST
// Add Recipe - POST
exports.recipe_add_post = (req, res) => {
    console.log(req.body);
    let recipe = new Recipe(req.body);
    recipe.save()
    .then(()=>{
        User.findById(req.body.chef, (err, chef) =>{
            console.log(recipe);
            chef.recipe.push(recipe);
            chef.save();
        })
        res.redirect("/recipe/myrecipes");
    })
    .catch(err => {
        console.log(err);
    })
}
//  Update Recipe - PUT
exports.recipe_update_put = (req, res) => {
    Recipe.findByIdAndUpdate(req.body.id, req.body)
    .then(()=> {
        res.redirect("/recipe/myrecipes");
    })
    .catch(err => {
        console.log(err)
    })
}




// exports.recipes_Update_put = (req, res) => {
//     res.render("recipe/edit")   
// }



