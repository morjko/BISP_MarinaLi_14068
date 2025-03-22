import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
    res.send('Success',
    );
};

export const editUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You are allowed to edit only your own profile!'));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 6)
        }
        const editedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                ava: req.body.ava
            }
        }, {new: true})

        const {password, ...rest} = editedUser._doc
        res.status(200).json(rest);

    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You are allowed to delete only your own profile!'))
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('token')
        res.status(200).json('Your profile has been deleted!');
    } catch (error) {
        next(error);
    }
}