import { Request, Response } from 'express';
import { DegreeCourse } from './DegreeCourseModel.js';

export const getDegreeCourses = async (req: Request, res: Response) => {
  try {
    if (req.query.universityShortName) {
      const universityShortName = req.query.universityShortName as string;
      const courses = await DegreeCourse.find({ universityShortName });
      return res.status(200).json(courses);
    }

    const courses = await DegreeCourse.find();
    res.status(200).json(courses);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const createDegreeCourse = async (req: Request, res: Response) => {
  try {
    const {
      name,
      shortName,
      universityName,
      universityShortName,
      departmentName,
      departmentShortName
    } = req.body;

    if (!name || !shortName || !universityName || !universityShortName ||
        !departmentName || !departmentShortName) {
      return res.status(400).json({
        error: 'All fields (name, shortName, universityName, universityShortName, departmentName, departmentShortName) are required'
      });
    }

    const newCourse = new DegreeCourse({
      name,
      shortName,
      universityName,
      universityShortName,
      departmentName,
      departmentShortName
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getDegreeCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await DegreeCourse.findById(id);

    if (!course) {
      return res.status(404).json({ error: 'Degree course not found' });
    }

    res.status(200).json(course);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateDegreeCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedCourse = await DegreeCourse.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Degree course not found' });
    }

    res.status(200).json(updatedCourse);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteDegreeCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCourse = await DegreeCourse.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ error: 'Degree course not found' });
    }

    res.status(204).end();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
