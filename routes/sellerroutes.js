const express = require('express');
const router = express.Router();
const user=require('../controllers/sellercontroller');
router.post("/create",create);
router.get("/allowed",isallowed);
router.get("/availability/:username",available);
router.get("/statescities",statescities);
export default router;
