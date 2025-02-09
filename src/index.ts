import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import adapterRouter from './routes/adapterRoutes';
import eventRouter from './routes/eventRoutes';
import authRouter from './routes/authRoutes';
import waitlistRouter from './routes/itad/waitlistRoutes';
import { logger } from './services/utilities/logger';

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(cookieParser());

app.use(express.json());

app.use(logger);

app.use('/api/adapter', adapterRouter);
app.use('/api/event', eventRouter);
app.use('/api/auth', authRouter);
app.use('/api/itad/waitlist', waitlistRouter);

mongoose.connect(process.env.MONGO_DB_URI).then(async () => {
    console.log('Connected to MongoDB');

    app.listen(process.env.PORT, () => {
        console.log(`App is listening on port ${process.env.PORT}`);
    });
});