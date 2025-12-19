import {Router} from 'express';
import {walletAuth} from '../controllers/auth.controller.js';
const router = Router();
router.post('/', walletAuth);
export default router;