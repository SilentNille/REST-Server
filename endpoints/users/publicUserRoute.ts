import express from 'express';
import * as userMethods from './UserService.js';

export const router = express.Router();

router.get('/', userMethods.getUsers);

router.post('/', userMethods.createUser);

router.delete('/:userID', userMethods.deleteUser);

router.get('/:userID', userMethods.searchUserById);

router.put('/:userID', userMethods.updateUser);