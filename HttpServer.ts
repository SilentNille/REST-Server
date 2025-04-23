import express from 'express';
import dotenv from 'dotenv';
import { startDB } from './db/Database.js';
import bodyParser from 'body-parser';
import { router as publicUserRouter } from './endpoints/users/publicUserRoute.js';

dotenv.config();

const app = express();
const port = 80;

app.use(bodyParser.json());
app.use('/api/publicUsers', publicUserRouter);

startDB();

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});