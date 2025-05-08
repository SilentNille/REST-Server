import { Request, Response } from 'express';
import { User } from './UserModel.js';
import bcrypt from 'bcryptjs';
import { DecodedUser } from '../authenticate/AuthService.js';

const removePassword = (user: any) => {
  const _user = user.toObject ? user.toObject() : { ...user };
  delete _user.password;
  return _user;
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    const userWithoutPassword = users.map(user => removePassword(user));
    res.status(200).json(userWithoutPassword);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userID, password, firstName, lastName, isAdministrator = false } = req.body;
    if (!userID || !password) {
      return res.status(400).json({ error: 'userID and password are required' });
    }
    const existingUser = await User.findOne({ userID });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this userID already exists' });
    }
    const newUser = new User({
      userID,
      password,
      firstName,
      lastName,
      isAdministrator
    });
    await newUser.save();
    
    const userWithoutPassword = removePassword(newUser);
    res.status(201).json(userWithoutPassword);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const deletedUser = await User.findOneAndDelete({ userID });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204);
    res.end();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const searchUserById = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await User.findOne({ userID });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const currentUser = res.locals.user as DecodedUser;
    if (!currentUser || (!currentUser.isAdministrator && currentUser.userID !== userID)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const userWithoutPassword = removePassword(user);
    res.status(200).json(userWithoutPassword);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    
    const currentUser = res.locals.user as DecodedUser;
    if (!currentUser || (!currentUser.isAdministrator && currentUser.userID !== userID)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const updateData = { ...req.body };
    
    if (!currentUser.isAdministrator && 'isAdministrator' in updateData) {
      return res.status(403).json({ error: 'Cannot change administrator status' });
    }
    
    if (updateData.userID) {
      return res.status(400).json({ error: 'Cannot change userID' });
    }
    
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    
    const updatedUser = await User.findOneAndUpdate(
      { userID },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const userWithoutPassword = removePassword(updatedUser);
    res.status(200).json(userWithoutPassword);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};