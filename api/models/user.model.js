import mongoose from "mongoose";

//defining schema for user model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    ava: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
    }
}, {timestamps: true}); //to record time of creation and update

//creating user model implementing schema
const User = mongoose.model('User', userSchema);

//exporting user model
export default User;