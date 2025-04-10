import { Schema, model } from 'mongoose';
import { User } from './UserModel.js';
import { getUserById } from './UserService.js';

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