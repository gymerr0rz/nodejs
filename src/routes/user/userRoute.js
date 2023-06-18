import * as userController from '../../controllers/user/authController.js';
import express from 'express';
import { authenticateToken } from '../../utils/authenticateToken.js';
const router = express.Router();

router.post('/register', userController.register_user);
router.post('/login', userController.login_user);
router.get('/users', authenticateToken, userController.get_users);

export default router;
