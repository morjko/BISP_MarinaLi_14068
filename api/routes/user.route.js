import express from 'express';
import { deleteUser, editUser, test, viewUserAdvert, getUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

//route for '/test' to call 'test' controller
router.get('/test', test);

//route for '/edit/:id' to call 'editUser' controller
router.post('/edit/:id', verifyUser, editUser);

router.delete('/delete/:id', verifyUser, deleteUser);
router.get('/advert/:id', verifyUser, viewUserAdvert);
router.get('/:id', verifyUser, getUser);

export default router;