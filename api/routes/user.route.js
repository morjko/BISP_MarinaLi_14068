import express from 'express';
import { deleteUser, editUser, test } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

//route for '/test' to call 'test' controller
router.get('/test', test);
router.post('/edit/:id', verifyUser, editUser);
router.delete('/delete/:id', verifyUser, deleteUser);

export default router;