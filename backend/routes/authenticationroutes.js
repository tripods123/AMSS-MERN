const express = require('express');
const router = express.Router();
const auth = require('../controllers/authenticationcontroller');
const verifyToken = require('./verifyToken');

router.get("/getstatus",auth.checkstatus);
router.get("/signout",verifyToken,auth.signout);
router.post("/signin",auth.authenticate);
module.exports= router;