import Advert from "../models/advert.model.js"

export const createAdvert = async (req, res, next) => {
    try {
        const advert = await Advert.create(req.body);
        return res.status(201).json(advert);
    } catch (error) {
        next(error)
    }
}