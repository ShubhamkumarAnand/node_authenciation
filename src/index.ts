require('dotenv').config();
import express from 'express';
import { createConnection } from 'typeorm';
import { routes } from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

createConnection().then(() => {
    const app = express();

    app.use(express.json());

    app.use(cookieParser());

    app.use(
        cors({
            origin: ['http://localhost:3000'],
            credentials: true,
        })
    );

    routes(app);

    app.listen(5500, () => {
        console.log('Listning to port : 5500');
    });
});
