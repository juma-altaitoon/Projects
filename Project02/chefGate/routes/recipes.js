const { urlencoded } = require('express');
const express = require('express');
const router = express.Router();
router.use(urlencoded({extended: true}));
const isLogedIn = require('../helper/isLoggedIn');
let methodOverride= require('method-override');
router.use(methodOverride('_method'))


const recipeCtrl = require("../controllers/recipes");
router.get("/recipe", recipeCtrl.recipes_get);

//GET
router.get("/recipe/add", isLogedIn, recipeCtrl.recipe_add_get);
router.get("/recipe/details", recipeCtrl.recipe_details_get);
router.get("/recipe/edit", isLogedIn,recipeCtrl.recipe_edit_get);
router.get("/recipe/index", recipeCtrl.recipes_index_get);
router.get("/recipe/myrecipes", isLogedIn,recipeCtrl.myrecipes_index_get);
router.get("/recipe/delete", isLogedIn,recipeCtrl.recipe_delete_get)
//POST
router.post("/recipe/add", isLogedIn,recipeCtrl.recipe_add_post);
router.put("/recipe/update", isLogedIn,recipeCtrl.recipe_update_put);
// router.post("/recipe/details", recipeCtrl.recipes_details_post);
// router.post("/recipe/index", recipeCtrl.recipes_index_post);

module.exports = router;