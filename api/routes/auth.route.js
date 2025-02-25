import express from 'express';
import { signup, signin, google, signOut } from '../controllers/auth.controller.js';

const router = express.Router();

//route for '/signup' to call 'signup' controller
router.post("/signup", signup);

//route for '/signin' to call 'signin' controller
router.post("/signin", signin);

//route for '/google' to call 'google' controller
router.post("/google", google);

//route for '/signout' to call 'signOut' controller
router.get("/signout", signOut);

export default router;