import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import { startDB } from './db/Database.js';
import { router as authRouter } from './endpoints/authenticate/AuthRoute.js';
import { createDefaultAdmin } from './endpoints/authenticate/AuthService.js';
import { router as degreeCourseApplicationRouter } from './endpoints/degreeCourseApplications/DegreeCourseApplicationRoute.js';
import { router as degreeCourseRouter } from './endpoints/degreeCourses/DegreeCourseRoute.js';
import { router as publicUserRouter } from './endpoints/users/publicUserRoute.js';
import { router as userRouter } from './endpoints/users/UserRoute.js';

const app = express();
const httpPort = config.get('server-config.http.port');
const httpsPort = config.get('server-config.https.port');

app.use(bodyParser.json());

app.use('/api/publicUsers', publicUserRouter);

app.use('/api/authenticate', authRouter);
app.use('/api/users', userRouter);
app.use('/api/degreeCourses', degreeCourseRouter);
app.use('/api/degreeCourseApplications', degreeCourseApplicationRouter);

const sslKeyPath = config.get<string>('server-config.https.keyPath');
const sslCertPath = config.get<string>('server-config.https.certPath');

startDB().then(async () => {
  await createDefaultAdmin();

  try {
    const httpsOptions = {
      key: fs.readFileSync(sslKeyPath as string),
      cert: fs.readFileSync(sslCertPath as string)
    };

    https.createServer(httpsOptions, app).listen(httpsPort, () => {
      console.log(`HTTPS Server is running at https://localhost:${httpsPort}`);
    });

    http.createServer(app).listen(httpPort, () => {
      console.log(`HTTP Server is running at http://localhost:${httpPort}`);
    });
  } catch (error) {
    console.error('Error starting HTTPS server:', error);
    http.createServer(app).listen(httpPort, () => {
      console.log(`HTTP Server is running at http://localhost:${httpPort}`);
    });
  }
}).catch(err => {
  console.error('Failed to start database:', err);
  process.exit(1);
});
