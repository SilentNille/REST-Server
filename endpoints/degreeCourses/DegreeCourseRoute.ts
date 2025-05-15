import express from 'express';
import { 
  getDegreeCourses, 
  createDegreeCourse, 
  getDegreeCourseById, 
  updateDegreeCourse, 
  deleteDegreeCourse 
} from './DegreeCourseService.js';
import { verifyToken, verifyAdmin } from '../authenticate/AuthService.js';
import { getApplicationsByDegreeCourse } from '../degreeCourseApplications/DegreeCourseApplicationService.js';

export const router = express.Router();

router.get('/', verifyToken, getDegreeCourses);

router.post('/', verifyToken, verifyAdmin, createDegreeCourse);

router.get('/:id', verifyToken, getDegreeCourseById);

router.put('/:id', verifyToken, verifyAdmin, updateDegreeCourse);

router.delete('/:id', verifyToken, verifyAdmin, deleteDegreeCourse);

// Nested route to get all applications for a specific degree course
router.get('/:id/degreeCourseApplications', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const applications = await getApplicationsByDegreeCourse(id);
    res.json(applications);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});