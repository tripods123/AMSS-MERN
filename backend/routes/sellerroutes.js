import { Router } from 'express';
const router = Router();
import { create, isallowed, available, statescities } from '../controllers/sellercontroller';
router.post("/create",create);
router.get("/allowed",isallowed);
router.get("/availability/:username",available);
router.get("/statescities",statescities);
export default router;
