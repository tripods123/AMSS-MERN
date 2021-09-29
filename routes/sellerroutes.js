const express = require('express');
const router = express.Router();
const seller=require('../controllers/sellercontroller');
router.post("/create",seller.create);
router.get("/allowed",seller.isallowed);
router.get("/availability/:username",seller.available);
router.get("/statescities",seller.states);
module.exports=  router;
