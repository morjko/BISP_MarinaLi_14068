import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

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