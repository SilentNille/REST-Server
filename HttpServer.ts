import express from 'express';
import dotenv from 'dotenv';
import { startDB } from './db/Database.js';
import bodyParser from 'body-parser';
import { router as publicUserRouter } from './endpoints/users/publicUserRoute.js';
import { router as userRouter } from './endpoints/users/UserRoute.js';
import { router as authRouter } from './endpoints/authenticate/AuthRoute.js';
import { router as degreeCourseRouter } from './endpoints/degreeCourses/DegreeCourseRoute.js';
import { router as degreeCourseApplicationRouter } from './endpoints/degreeCourseApplications/DegreeCourseApplicationRoute.js';
import { createDefaultAdmin } from './endpoints/authenticate/AuthService.js';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const httpPort = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 80;
const httpsPort = process.env.HTTPS_PORT ? parseInt(process.env.HTTPS_PORT) : 443;

app.use(bodyParser.json());

// Public endpoint for users (from Milestone 1)
app.use('/api/publicUsers', publicUserRouter);

// Protected endpoints for Milestone 2 and 3
app.use('/api/authenticate', authRouter);
app.use('/api/users', userRouter);
app.use('/api/degreeCourses', degreeCourseRouter);
app.use('/api/degreeCourseApplications', degreeCourseApplicationRouter);

// Read SSL certificate files
const sslKeyPath = process.env.SSL_KEY_PATH || './certificates/key.pem';
const sslCertPath = process.env.SSL_CERT_PATH || './certificates/cert.pem';

startDB().then(async () => {
  await createDefaultAdmin();
  
  try {
    // Create HTTPS server
    const httpsOptions = {
      key: fs.readFileSync(sslKeyPath),
      cert: fs.readFileSync(sslCertPath)
    };
    
    // Start HTTPS server
    https.createServer(httpsOptions, app).listen(httpsPort, () => {
      console.log(`HTTPS Server is running at https://localhost:${httpsPort}`);
    });
    
    // Start HTTP server for backward compatibility
    http.createServer(app).listen(httpPort, () => {
      console.log(`HTTP Server is running at http://localhost:${httpPort}`);
    });
  } catch (error) {
    console.error('Error starting HTTPS server:', error);
    // Fall back to HTTP only if SSL certificates are not available
    http.createServer(app).listen(httpPort, () => {
      console.log(`HTTP Server is running at http://localhost:${httpPort}`);
      console.warn('Warning: Running in HTTP mode only, HTTPS server could not be started');
    });
  }
}).catch(err => {
  console.error('Failed to start database:', err);
  process.exit(1);
});