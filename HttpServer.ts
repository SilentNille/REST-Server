import express from 'express';
import dotenv from 'dotenv';
import { startDB } from './db/Database.js';
import bodyParser from 'body-parser';
import { router as publicUserRouter } from './endpoints/users/publicUserRoute.js';
import { router as userRouter } from './endpoints/users/UserRoute.js';
import { router as authRouter } from './endpoints/authenticate/AuthRoute.js';
import { router as degreeCourseRouter } from './endpoints/degreeCourses/DegreeCourseRoute.js';
import { createDefaultAdmin } from './endpoints/authenticate/AuthService.js';

dotenv.config();

const app = express();
const port = 80;

app.use(bodyParser.json());

// Public endpoint for users (from Milestone 1)
app.use('/api/publicUsers', publicUserRouter);

// Protected endpoints for Milestone 2
app.use('/api/authenticate', authRouter);
app.use('/api/users', userRouter);
app.use('/api/degreeCourses', degreeCourseRouter);

startDB().then(async () => {
  await createDefaultAdmin();
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Failed to start database:', err);
  process.exit(1);
});