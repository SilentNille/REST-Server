import express from 'express';
import { 
  getDegreeCourses, 
  createDegreeCourse, 
  getDegreeCourseById, 
  updateDegreeCourse, 
  deleteDegreeCourse 
} from './DegreeCourseService.js';
import { verifyToken, verifyAdmin } from '../authenticate/AuthService.js';

export const router = express.Router();

router.get('/', verifyToken, getDegreeCourses);

router.post('/', verifyToken, verifyAdmin, createDegreeCourse);

router.get('/:id', verifyToken, getDegreeCourseById);

router.put('/:id', verifyToken, verifyAdmin, updateDegreeCourse);

router.delete('/:id', verifyToken, verifyAdmin, deleteDegreeCourse);