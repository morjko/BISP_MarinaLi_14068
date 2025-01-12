import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

//route for '/signup' to call 'signup' controller
router.post("/signup", signup);

export default router;