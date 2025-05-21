import bcrypt from 'bcryptjs';
import config from 'config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../users/UserModel.js';

const JWT_SECRET = config.get<string>('session-config.tokenKey');

export interface DecodedUser {
  userID: string;
  isAdministrator: boolean;
  firstName: string;
  lastName: string;
}

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [userID, password] = credentials.split(':');

    const user = await User.findOne({ userID });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const tokenExpireSeconds = config.get<number>('session-config.tokenTTL');
    const token = jwt.sign(
      {
        userID: user.userID,
        isAdministrator: user.isAdministrator,
        firstName: user.firstName,
        lastName: user.lastName
      },
      JWT_SECRET,
      { expiresIn: tokenExpireSeconds }
    );

    res.setHeader('Authorization', 'Bearer ' + token);

    res.status(200).json(null);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedUser;
    res.locals.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user as DecodedUser;
  if (!user || !user.isAdministrator) {
    return res.status(403).json({ error: 'Admin privilege required' });
  }
  next();
};

export const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ userID: 'admin' });

    if (!existingAdmin) {
      const defaultAdmin = new User({
        userID: 'admin',
        password: '123',
        firstName: 'Admin',
        lastName: 'User',
        isAdministrator: true
      });

      await defaultAdmin.save();
    } else {
      try {
        const isPasswordValid = await bcrypt.compare('123', existingAdmin.password);
        if (!isPasswordValid) {
          existingAdmin.password = '123';
          await existingAdmin.save();
        }
      } catch (err) {
        console.error('Error checking admin password:', err);
      }
    }
  } catch (error) {
    console.error('Failed to create/update default admin:', error);
  }
};
