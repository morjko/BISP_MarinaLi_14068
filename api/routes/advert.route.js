import express from 'express';
import { createAdvert } from '../controllers/advert.controller.js';
import {verifyUser} from '../utils/verifyUser.js'

const router = express.Router();

router.post('/create', verifyUser, createAdvert);

export default router;