# REST Server for Student Applicant Portal

## Course Information
- **Course**: Web Engineering II
- **Professor**: Prof. Dr. Sebastian von Klinski
- **Contact**: klinski@beuth-hochschule.de, Room B230aa

## Project Overview

This project involves implementing a backend REST server for a student applicant portal. The server will be built using TypeScript and will follow REST principles, using JSON as the message protocol.

## Project Milestones

The assignment is divided into three milestones:

1. **[Milestone 1](./milestone1.md)**: Implement basic REST server functionality with a simple user management endpoint
2. **[Milestone 2](./milestone2.md)**: Add authentication and implement a second endpoint
3. **[Milestone 3](./milestone3.md)** (Final Submission): Complete all requirements as described in this document

## Domain Description

The student applicant portal allows students to apply for admission to university programs. Users can select degree programs they want to apply for and create applications.

The system manages three main entities:

### 1. User
- **userID**: Unique identifier (e.g., "manfred") - required
- **firstName**: User's first name - optional
- **lastName**: User's last name - optional
- **isAdministrator**: Boolean flag indicating admin rights (default: false)
- **password**: Hashed user password - required

### 2. DegreeCourse
- **id**: Unique identifier
- **name**: Full name of the degree program (e.g., "Medieninformatik Bachelor") - required
- **shortName**: Abbreviated name (e.g., "MB-B") - required
- **universityName**: University offering the program - required
- **universityShortName**: University abbreviation - required
- **departmentName**: Department name - required 
- **departmentShortName**: Department abbreviation - required

### 3. DegreeCourseApplication
- **id**: Unique identifier
- **applicantUserID**: User ID of the applicant - required
- **degreeCourseID**: ID of the degree program - required
- **targetPeriodYear**: Application year - required
- **targetPeriodShortName**: Semester abbreviation ("WiSe" or "SoSe") - required

## Entity Relationships
- A university can offer multiple degree programs
- Each degree program can have multiple applications
- A student can have multiple applications for different programs
- A student cannot have multiple applications for the same program in the same semester, but can apply for different semesters

## Technical Requirements

### Technologies
- Node.js
- Express.js
- Mongoose
- MongoDB (local installation)
- TypeScript (mandatory)

### MongoDB Notes
- Use a local MongoDB installation with default settings
- MongoDB automatically creates an "_id" attribute that should be mapped to "id" in API responses
- Do not use cloud database instances

## API Endpoints

The REST server must implement 5 endpoints:

### 1. /api/publicUsers
- Test endpoint for Milestone 1
- No authentication required
- Manages user creation, editing, and retrieval
- Should return passwords (only for this endpoint)

### 2. /api/users
- Main endpoint for user management
- Requires authentication and authorization
- Uses the same entities as the /publicUsers endpoint

### 3. /api/authenticate
- Handles user authentication
- Returns an access token for successful authentication

### 4. /api/degreeCourses
- Manages degree courses (create, retrieve, update, delete, search)

### 5. /api/degreeCourseApplications
- Manages student applications to degree programs

## Project Structure

Your project should follow this structure:
- **httpServer.ts**: Main server entry point
- **endpoints/**: Contains all endpoint implementations
  - Each endpoint should have its own subdirectory
  - Each endpoint should have separate files for routes, services, and models
- **config/**: Configuration files
- **certificates/**: HTTPS certificates
- **db/**: Database connection modules

## Authorization Rules

### User Management
- Only administrators can list, create, update, or delete all users
- Users can view and update their own information
- Users can change their own password, first name, and last name
- Unauthenticated users cannot access user data

### Degree Programs
- Only administrators can create, update, or delete degree programs
- All users (including unauthenticated) can view degree programs

### Degree Program Applications
- Administrators can manage all applications
- Regular users can only view, update, or delete their own applications
- Regular users can only modify the year and semester of their applications
- Only one application per user, per program, per semester is allowed
- Unauthenticated users cannot access application data

## Implementation Requirements

### Server Startup
- The server must start with `npm start`
- On first startup (Milestone 2+), create a default admin user if no users exist
  - Username: "admin"
  - Password: "123"

### Code Quality
- Code must be properly formatted without commented-out code
- Configuration values should be externalized, not hardcoded
- Sensitive information should use environment variables

### Security
- Use HTTPS with self-signed certificates
- Implement Basic Authentication for login
- Use JWT tokens for authentication after login
- Store passwords as hashed values with salt using Bcrypt
- Implement token verification using middleware functions
- Implement role-based authorization using the isAdministrator flag

## HTTP Standards
- Use appropriate HTTP methods (GET, POST, PUT, DELETE)
- Use correct HTTP status codes
- Return JSON for all responses, including errors
- Never return plain text responses
- Set Content-Type header appropriately

## Final Notes
- Test your application thoroughly before submission
- Ensure all dependencies are properly listed in package.json
- Configure the start script in package.json
- Make sure the application runs on another computer without modifications