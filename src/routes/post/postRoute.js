import * as postController from '../../controllers/post/postController.js';
import express from 'express';
import { authenticateToken } from '../../utils/authenticateToken.js';
const router = express.Router();

router.post('/', authenticateToken, postController.create_post);
router.get('/', authenticateToken, postController.get_posts);
router.get('/post-request', authenticateToken, postController.request_post);
router.post('/post-request', authenticateToken, postController.request_post_id);

export default router;
