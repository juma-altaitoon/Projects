const express = require('express');
const router = express.Router();

const aboutUsCtrl = require("../controllers/aboutUs");

router.get('/aboutus', aboutUsCtrl.aboutUs_get)


module.exports = router;