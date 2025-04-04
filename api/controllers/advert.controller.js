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

export const getAdvert = async (req, res, next) => {
    try {
        const advert = await Advert.findById(req.params.id);
        if (!advert) {
            return next(errorHandler(404, 'Advert is not found'));
        }
        res.status(200).json(advert);
    } catch (error) {
        next(error);
    }
}

export const getAdverts = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 8;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let dogs = req.query.dogs;
        if (dogs === undefined || dogs === 'false') {
            dogs = {$in: [false, true]}
        }

        let cats = req.query.cats;
        if (cats === undefined || cats === 'false') {
            cats = {$in: [false, true]}
        }

        let birds = req.query.birds;
        if (birds === undefined || birds === 'false') {
            birds = {$in: [false, true]}
        }

        let reptiles = req.query.reptiles;
        if (reptiles === undefined || reptiles === 'false') {
            reptiles = {$in: [false, true]}
        }

        let others = req.query.others;
        if (others === undefined || others === 'false') {
            others = {$in: [false, true]}
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const adverts = await Advert.find({
            name: {$regex: searchTerm, $options: 'i'},
            dogs,
            cats,
            birds,
            reptiles,
            others
        }).sort({
            [sort]: order
        }).limit(limit).skip(startIndex);

        return res.status(200).json(adverts)

    } catch (error) {
        next(error);
    }
}