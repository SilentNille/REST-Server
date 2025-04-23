import { Request, Response } from 'express';
import { User } from './UserModel.js';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
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
    res.status(201).json(newUser);
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
    res.status(200).json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const updatedUser = await User.findOneAndUpdate(
      { userID },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};