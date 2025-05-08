import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../users/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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

    const token = jwt.sign(
      { 
        userID: user.userID,
        isAdministrator: user.isAdministrator,
        firstName: user.firstName,
        lastName: user.lastName 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.setHeader('Authorization', token);
    
    const userResponse = {
      userID: user.userID,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdministrator: user.isAdministrator
    };
    
    res.status(200).json(userResponse);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

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
    const existingAdmin = await User.findOne({ isAdministrator: true });
    
    if (!existingAdmin) {
      const adminPassword = '123';
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      const defaultAdmin = new User({
        userID: 'admin',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        isAdministrator: true
      });
      
      await defaultAdmin.save();
      console.log('Default admin user created');
    }
  } catch (error) {
    console.error('Failed to create default admin:', error);
  }
};