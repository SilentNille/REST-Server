import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  userID: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdministrator?: boolean;
  id?: string;
}

const userSchema = new Schema<IUser>({
  userID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isAdministrator: { type: Boolean, default: false },
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  }
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const User = model<IUser>('User', userSchema);
