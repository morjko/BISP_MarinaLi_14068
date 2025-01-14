import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';

const router = express.Router();

//route for '/signup' to call 'signup' controller
router.post("/signup", signup);

//route for '/signin' to call 'signin' controller
router.post("/signin", signin);

export default router;