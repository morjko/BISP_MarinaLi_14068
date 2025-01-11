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
}, {timestamps: true}); //to record time of creation and update

//creating user model implementing schema
const User = mongoose.model('User', userSchema);

//exporting user model
export default User;