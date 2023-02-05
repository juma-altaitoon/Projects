const express = require("express");
const router = express.Router();
const chefsCtrl = require('../controllers/chefs');

let methodOverride= require('method-override');
router.use(methodOverride('_method'))


router.get("/chef", chefsCtrl.chefs_get);
router.get("/chef/index", chefsCtrl.chefs_index_get);

module.exports = router;