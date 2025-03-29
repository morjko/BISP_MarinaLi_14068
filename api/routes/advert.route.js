import express from 'express';
import { createAdvert, deleteAdvert } from '../controllers/advert.controller.js';
import {verifyUser} from '../utils/verifyUser.js'

const router = express.Router();

router.post('/create', verifyUser, createAdvert);
router.delete('/delete/:id', verifyUser, deleteAdvert);

export default router;