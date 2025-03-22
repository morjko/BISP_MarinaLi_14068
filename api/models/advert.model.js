import mongoose from 'mongoose';

const advertSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }, 
        dogs: {
            type: Boolean,
            required: true
        },
        cats: {
            type: Boolean,
            required: true
        },
        birds: {
            type: Boolean,
            required: true
        },
        reptiles: {
            type: Boolean,
            required: true
        },
        imageUrls: {
            type: Array,
            required: true
        }, 
        userRef: {
            type: String,
            required: true
        }
    }, {timestamps: true}
)

const Advert = mongoose.model('Advert', advertSchema);
export default Advert;