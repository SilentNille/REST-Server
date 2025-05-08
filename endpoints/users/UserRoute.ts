import express from 'express';
import { getUsers, createUser, deleteUser, searchUserById, updateUser } from './UserService.js';
import { verifyToken, verifyAdmin } from '../authenticate/AuthService.js';

export const router = express.Router();

router.get('/', verifyToken, verifyAdmin, getUsers);

router.post('/', verifyToken, verifyAdmin, createUser);

router.get('/:userID', verifyToken, searchUserById);

router.put('/:userID', verifyToken, updateUser);

router.delete('/:userID', verifyToken, verifyAdmin, deleteUser);