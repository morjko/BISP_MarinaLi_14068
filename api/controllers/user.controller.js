import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Advert from '../models/advert.model.js';

export const test = (req, res) => {
    res.send('Success',
    );
};

export const editUser = async (req, res, next) => {
    //checks if user is the owner of profile
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
    //checks if user is the owner of profile
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You are allowed to delete only your own profile!'))
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('token')
        res.status(200).json('Your profile has been deleted!');
    } catch (error) {
        next(error);
    }
}

export const viewUserAdvert = async (req, res, next) => {
    //checks if user is the owner of profile
    if (req.user.id === req.params.id) {
        try {
            const advert = await Advert.find({userRef: req.params.id});
            res.status(200).json(advert);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, 'Can view only own advert!'));
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return next(errorHandler(404, 'User is not found!'));
    
        const {password: pass, ...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}