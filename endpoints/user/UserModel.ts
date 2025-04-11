import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  userID: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdministrator: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  userID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isAdministrator: { type: Boolean, required: true },
});

// Hash the password before saving the user document
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// 3. Create a Model.
export const User = model<IUser>('User', userSchema);
