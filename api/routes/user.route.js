import express from 'express';
import {test} from '../controllers/user.controller.js';

const router = express.Router();

//route for '/test' to call 'test' controller
router.get('/test', test);

export default router;