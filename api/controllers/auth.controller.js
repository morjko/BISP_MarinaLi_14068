import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;

    const hashPassword = bcryptjs.hashSync(password, 6);
    const newUser = new User ({username, email, password: hashPassword});
    try {
        await newUser.save();
        res.status(201).json('User added');
    } catch (err) {
        next(err);
    }
};

export const signin = async (req, res, next) => {
    const {email, password} = req.body;    
    try {
        // check email
        const validUser = await User.findOne({email});
        if (!validUser) return next(errorHandler(404, 'User is not found'));

        // check password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Email or password are wrong'));

        // check authentification of the user
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);

        res.cookie('token', token, {httpOnly: true}).status(200).json(validUser);
    } catch (err) {
        next(err);
    }
}