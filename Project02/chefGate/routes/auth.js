const express = require('express');
const router = express.Router();
const isLogedIn = require('../helper/isLoggedIn');
// router.use(express.urlencoded({extended: true}));
let methodOverride= require('method-override');
router.use(methodOverride('_method'))


const authCtrl = require("../controllers/auth");

router.get("/auth", authCtrl.auth_get);

router.get("/auth/signup", authCtrl.auth_signup_get);
router.post("/auth/signup", authCtrl.auth_signup_post);

router.get("/auth/login", authCtrl.auth_login_get);
router.post("/auth/login", authCtrl.auth_login_post);

router.get("/auth/dashboard", isLogedIn,authCtrl.auth_dashboard_get);
router.get("/auth/logout", isLogedIn,authCtrl.auth_logout_get);
router.get("/chef/details", isLogedIn,authCtrl.user_details_get);
router.get("/chef/edit", isLogedIn,authCtrl.auth_edit_get);
router.put("/chef/update", isLogedIn,authCtrl.auth_update_put);
router.get("/auth/index", isLogedIn,authCtrl.user_index_get)

module.exports = router;