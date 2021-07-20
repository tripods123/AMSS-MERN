import { Router } from 'express';
const router = Router();
import { create, isallowed, isallowedgeneral, available } from '../controllers/usercontroller';
router.post("/create",create);
router.get("/allowed",isallowed);
router.get("/allowedgeneral",isallowedgeneral);
router.get("/availability/:username",available);
export default router;