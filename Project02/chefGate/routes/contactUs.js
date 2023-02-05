const express = require('express');
const router = express.Router();
const contactUsCtrl = require("../controllers/contactUs");

router.get("/contactus", contactUsCtrl.contactUs_get);

module.exports = router;