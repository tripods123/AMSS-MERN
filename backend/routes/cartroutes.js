const express = require('express');
const router = express.Router();
const cart=require('../controllers/cartcontroller');
const verifyToken = require('./verifyToken');

router.get("/getcart",verifyToken,cart.getcart);
router.post("/addtocart",verifyToken,cart.addtocart);
router.delete("/delete",verifyToken,cart.delete);
module.exports= router;