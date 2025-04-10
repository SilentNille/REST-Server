import express from 'express';
import dotenv from 'dotenv';
import { startDB } from './db/Database.js';
import { createUser, getAll } from './endpoints/user/UserRoute.js';
import bodyParser from 'body-parser'

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json())

app.get('/api/users', async (req: express.Request, res: express.Response) => {

    if (req) {
        console.log("Got requets")
    }
    const users = await getAll();

    const resultUsers = users.map(function (item) {
        return { "userID": item.name, "firstName": item.email, "lastName": item.avatar }
    })

    res.send(Object.values(resultUsers));
});

app.post('/api/users', async (req: express.Request, res: express.Response) => {
    if (req) {
        console.log("Want to create new user with data: " + JSON.stringify(req.body))
    }
    await createUser(req.body);
    res.send("Habe user angelegt");
});

startDB()

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});