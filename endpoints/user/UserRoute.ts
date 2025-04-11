import { Schema, model } from 'mongoose';
import { User } from './UserModel.js';
import { getUserById } from './UserService.js';
import express from 'express';

type IUser = {
    name: string;
    email: string;
    avatar?: string; // Made avatar optional to match the UserModel definition
};

export async function getAll(): Promise<IUser[]> {
    const allUsers: IUser[] = await User.find();
    return allUsers;
}

export async function createUser(userData: IUser) {
    if (userData) {
        const user = new User({
            name: userData.name, // Corrected property mapping
            email: userData.email,
            avatar: userData.avatar
        });
        await user.save();
    } else {
        console.log("Have no user data");
    }
}

const router = express.Router();

// Create a new user
router.post('/publicUsers', async (req, res) => {
  try {
    const { userID, password, firstName, lastName, isAdministrator } = req.body;
    const newUser = new User({ userID, password, firstName, lastName, isAdministrator });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get('/publicUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get a user by userID
router.get('/publicUsers/:userID', async (req, res) => {
  try {
    const user = await User.findOne({ userID: req.params.userID });
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Update a user by userID
router.put('/publicUsers/:userID', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userID: req.params.userID },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by userID
router.delete('/publicUsers/:userID', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ userID: req.params.userID });
    if (!deletedUser) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(deletedUser);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;