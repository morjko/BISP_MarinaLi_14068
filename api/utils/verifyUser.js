import jwt from 'jsonwebtoken';
import {errorHandler} from './error.js';

export const verifyUser = (req, res, next) => {
    //verifies JWT token in a cookie
    const certainToken = req.cookies.token;

    if (!certainToken) return next(errorHandler(401, 'You are not authorised'));

    jwt.verify(certainToken, process.env.JWT_SECRET, (error, user) => {
        if (error) return next(errorHandler(403, 'Token is not valid'));
        
        req.user = user;
        next();
    })
}