import { DegreeCourseApplication, IDegreeCourseApplication } from './DegreeCourseApplicationModel.js';
import { DegreeCourse } from '../degreeCourses/DegreeCourseModel.js';
import { User } from '../users/UserModel.js';
import mongoose from 'mongoose';

/**
 * Create a new degree course application
 */
export const createApplication = async (
  applicationData: IDegreeCourseApplication
): Promise<IDegreeCourseApplication> => {
  try {
    // Validate degreeCourseID exists
    const degreeCourse = await DegreeCourse.findById(applicationData.degreeCourseID);
    if (!degreeCourse) {
      throw new Error('Degree course not found');
    }

    // Validate applicantUserID exists
    const user = await User.findOne({ userID: applicationData.applicantUserID });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if an application with the same combination already exists
    const existingApplication = await DegreeCourseApplication.findOne({
      applicantUserID: applicationData.applicantUserID,
      degreeCourseID: applicationData.degreeCourseID,
      targetPeriodYear: applicationData.targetPeriodYear,
      targetPeriodShortName: applicationData.targetPeriodShortName
    });

    if (existingApplication) {
      throw new Error('An application for this course and period already exists for this user');
    }

    // Create the application
    const newApplication = new DegreeCourseApplication(applicationData);
    await newApplication.save();
    return newApplication.toJSON();
  } catch (error: any) {
    if (error.code === 11000) { // Duplicate key error
      throw new Error('An application for this course and period already exists for this user');
    }
    throw error;
  }
};

/**
 * Get all applications
 */
export const getAllApplications = async (): Promise<IDegreeCourseApplication[]> => {
  const applications = await DegreeCourseApplication.find();
  return applications;
};

/**
 * Get applications by filters
 */
export const getApplicationsByFilter = async (
  filter: Partial<IDegreeCourseApplication>
): Promise<IDegreeCourseApplication[]> => {
  const applications = await DegreeCourseApplication.find(filter);
  return applications;
};

/**
 * Get applications by user ID
 */
export const getApplicationsByUser = async (
  applicantUserID: string
): Promise<IDegreeCourseApplication[]> => {
  const applications = await DegreeCourseApplication.find({ applicantUserID });
  return applications;
};

/**
 * Get applications by degree course ID
 */
export const getApplicationsByDegreeCourse = async (
  degreeCourseID: string
): Promise<IDegreeCourseApplication[]> => {
  const applications = await DegreeCourseApplication.find({ degreeCourseID });
  return applications;
};

/**
 * Get a specific application by ID
 */
export const getApplicationById = async (
  id: string
): Promise<IDegreeCourseApplication | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const application = await DegreeCourseApplication.findById(id);
  return application;
};

/**
 * Update an application
 */
export const updateApplication = async (
  id: string,
  updateData: Partial<IDegreeCourseApplication>
): Promise<IDegreeCourseApplication | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  
  // Prevent updating the applicantUserID or degreeCourseID
  if (updateData.applicantUserID || updateData.degreeCourseID) {
    throw new Error('Cannot change applicant or degree course for an existing application');
  }
  
  const updatedApplication = await DegreeCourseApplication.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );
  
  return updatedApplication;
};

/**
 * Delete an application
 */
export const deleteApplication = async (
  id: string
): Promise<boolean> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
  
  const result = await DegreeCourseApplication.findByIdAndDelete(id);
  return result !== null;
};
