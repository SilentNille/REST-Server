import express from 'express';
import { authenticateUser } from './AuthService.js';

export const router = express.Router();

router.get('/', authenticateUser);