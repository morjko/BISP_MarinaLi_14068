import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.mongoDB).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);

//all routes in userRouter, will be at '/api/user' endpoint
app.use('/api/user', userRouter);

//all routes in authRouter, will be at '/api/auth' endpoint
app.use('/api/auth', authRouter);

