import express from 'express';
import { editUser, test } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

//route for '/test' to call 'test' controller
router.get('/test', test);
router.post('/edit/:id', verifyUser, editUser);

export default router;