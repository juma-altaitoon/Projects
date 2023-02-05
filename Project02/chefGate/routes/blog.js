const express = require('express');
const router = express.Router();
const blogCtrl = require("../controllers/blog")

router.get("/blog", blogCtrl.blog_get);

module.exports = router;