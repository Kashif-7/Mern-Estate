import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";
import authRouter from './routes/auth.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB !');
    }).catch((err) => {
    console.log('Failed to connect to MongoDB !');
    console.log(err);
    }
);
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.listen(3000, () => {
    console.log('Server is running on port 3000 !');
    });

// app.use('/api/auth', authRouter);




