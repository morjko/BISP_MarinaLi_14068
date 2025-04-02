import express from 'express';
import { createAdvert, deleteAdvert, editAdvert, getAdvert, getAdverts } from '../controllers/advert.controller.js';
import {verifyUser} from '../utils/verifyUser.js'

const router = express.Router();

router.post('/create', verifyUser, createAdvert);
router.delete('/delete/:id', verifyUser, deleteAdvert);
router.post('/edit/:id', verifyUser, editAdvert);
router.get('/get/:id', getAdvert);
router.get('/get', getAdverts);

export default router;