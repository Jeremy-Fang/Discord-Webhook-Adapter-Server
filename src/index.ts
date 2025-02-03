import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import adapterRouter from './routes/adapterRoutes';
import eventRouter from './routes/eventRoutes';

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use('/api/adapter', adapterRouter);
app.use('/api/event', eventRouter);

mongoose.connect(process.env.MONGO_DB_URI).then(() => {
    console.log('Connected to MongoDB');
    
    app.listen(process.env.PORT, () => {
        console.log(`App is listening on port ${process.env.PORT}`);
    });
});