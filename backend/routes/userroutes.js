const express = require('express');
const router = express.Router();
const user=require('../controllers/usercontroller');
router.post("/create",create);
router.get("/allowed",isallowed);
router.get("/allowedgeneral",isallowedgeneral);
router.get("/availability/:username",available);
module.exports=  router;