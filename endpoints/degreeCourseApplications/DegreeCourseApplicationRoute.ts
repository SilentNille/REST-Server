import express from 'express';
import { verifyToken, verifyAdmin } from '../authenticate/AuthService.js';
import * as applicationService from './DegreeCourseApplicationService.js';
import { DecodedUser } from '../authenticate/AuthService.js';

export const router = express.Router();

// Create a new application
router.post('/', verifyToken, async (req, res) => {
  try {
    const user = res.locals.user as DecodedUser;
    let applicationData = req.body;
    
    // If applicantUserID isn't provided, use the authenticated user's ID
    if (!applicationData.applicantUserID) {
      applicationData.applicantUserID = user.userID;
    } else if (applicationData.applicantUserID !== user.userID && !user.isAdministrator) {
      // Only admins can create applications for other users
      return res.status(403).json({ error: 'You can only create applications for yourself' });
    }
    
    const newApplication = await applicationService.createApplication(applicationData);
    res.status(201).json(newApplication);
  } catch (error: any) {
    if (error.message === 'Degree course not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'An application for this course and period already exists for this user') {
      return res.status(409).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get all applications (admin only)
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { applicantUserID, degreeCourseID } = req.query;
    
    // Apply filters if provided
    if (applicantUserID) {
      const applications = await applicationService.getApplicationsByUser(applicantUserID as string);
      return res.json(applications);
    }
    
    if (degreeCourseID) {
      const applications = await applicationService.getApplicationsByDegreeCourse(degreeCourseID as string);
      return res.json(applications);
    }
    
    const applications = await applicationService.getAllApplications();
    res.json(applications);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get current user's applications
router.get('/myApplications', verifyToken, async (req, res) => {
  try {
    const user = res.locals.user as DecodedUser;
    const applications = await applicationService.getApplicationsByUser(user.userID);
    res.json(applications);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get specific application by ID
router.get('/:applicationID', verifyToken, async (req, res) => {
  try {
    const { applicationID } = req.params;
    const user = res.locals.user as DecodedUser;
    
    const application = await applicationService.getApplicationById(applicationID);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    // Regular users can only access their own applications
    if (!user.isAdministrator && application.applicantUserID !== user.userID) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(application);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Update application
router.put('/:applicationID', verifyToken, async (req, res) => {
  try {
    const { applicationID } = req.params;
    const user = res.locals.user as DecodedUser;
    const updateData = req.body;
    
    const application = await applicationService.getApplicationById(applicationID);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    // Regular users can only update their own applications and only certain fields
    if (!user.isAdministrator) {
      if (application.applicantUserID !== user.userID) {
        return res.status(403).json({ error: 'You can only update your own applications' });
      }
      
      // Regular users can only modify targetPeriodYear and targetPeriodShortName
      const allowedKeys = ['targetPeriodYear', 'targetPeriodShortName'];
      const providedKeys = Object.keys(updateData);
      
      for (const key of providedKeys) {
        if (!allowedKeys.includes(key)) {
          return res.status(403).json({ 
            error: `Regular users can only update: ${allowedKeys.join(', ')}` 
          });
        }
      }
    }
    
    const updatedApplication = await applicationService.updateApplication(applicationID, updateData);
    
    if (!updatedApplication) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.json(updatedApplication);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete application
router.delete('/:applicationID', verifyToken, async (req, res) => {
  try {
    const { applicationID } = req.params;
    const user = res.locals.user as DecodedUser;
    
    const application = await applicationService.getApplicationById(applicationID);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    // Regular users can only delete their own applications
    if (!user.isAdministrator && application.applicantUserID !== user.userID) {
      return res.status(403).json({ error: 'You can only delete your own applications' });
    }
    
    const success = await applicationService.deleteApplication(applicationID);
    
    if (!success) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
