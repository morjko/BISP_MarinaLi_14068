import Advert from "../models/advert.model.js"
import { errorHandler } from "../utils/error.js";

export const createAdvert = async (req, res, next) => {
    try {
        const advert = await Advert.create(req.body);
        return res.status(201).json(advert);
    } catch (error) {
        next(error)
    }
}

export const deleteAdvert = async (req, res, next) => {
    const advert = await Advert.findById(req.params.id);

    if (!advert) {
        return next(errorHandler(404, 'Advert is not found'));
    }

    if (req.user.id !== advert.userRef) {
        return next(errorHandler(401, 'You can delete only own advert!'));
    }

    try {
        await Advert.findByIdAndDelete(req.params.id);
        res.status(200).json('Advert has been deleted');
    } catch (error) {
        next(error);
    }
}

export const editAdvert = async (req, res, next) => {
    const advert = await Advert.findById(req.params.id);
    
    if (!advert) {
        return next(errorHandler(404, 'Advert is not found'));
    }

    if (req.user.id !== advert.userRef) {
        return next(errorHandler(401, 'You can edit only own advert'))
    }

    try {
        const editedAdvert = await Advert.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json(editedAdvert);
    } catch (error) {
        next(error);
    }
}