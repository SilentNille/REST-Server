# REST Server Project Explanation

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Core Components](#core-components)
- [Authentication & Authorization](#authentication--authorization)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Key Concepts](#key-concepts)
- [Testing](#testing)

## Project Overview

This project is a RESTful API server implementation for a university student applicant portal. It's built with TypeScript, Express.js, and MongoDB, following RESTful architectural principles. The server provides endpoints for user management, authentication, degree course management, and degree course applications.

### Key Project Requirements:

1. Strict TypeScript implementation
2. RESTful API design
3. MongoDB with Mongoose for data persistence
4. JWT-based authentication
5. Role-based authorization
6. HTTPS support (with fallback to HTTP)
7. Proper error handling

## Architecture

The project follows a modular architecture organized by resources:

```
HttpServer.ts                  # Main application entry point
├── db/                        # Database connection management
├── endpoints/                 # API endpoints grouped by resource
│   ├── authenticate/          # Authentication endpoints
│   ├── degreeCourses/         # Degree course management
│   ├── degreeCourseApplications/ # Application management
│   ├── users/                 # User management (authenticated)
│   └── test/                  # Test endpoints
└── tests/                     # HTTP test files
```

Each resource module (like users, degreeCourses) follows a consistent structure:
- **Model**: Defines the data schema and interface
- **Service**: Contains business logic
- **Route**: Defines API endpoints and connects them to service methods

## Core Components

### HttpServer.ts

This is the main entry point that:
- Configures Express.js
- Sets up middleware (like body-parser)
- Registers route handlers
- Connects to the database
- Creates a default admin user on startup
- Starts both HTTP and HTTPS servers

### Database Connection (db/Database.ts)

A simple module that connects to MongoDB:
```typescript
export async function startDB(){
    console.log("Connect database")
    await connect('mongodb://127.0.0.1:27017/test');
    console.log("connected db")
}
```

### User Model (endpoints/users/UserModel.ts)

Defines the user schema with Mongoose and includes password hashing with bcrypt:
```typescript
export interface IUser {
  userID: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdministrator?: boolean;
  id?: string;
}

// Schema definition with pre-save hook for password hashing
```

## Authentication & Authorization

### Authentication Flow

1. **Basic Authentication**:
   - User sends credentials via Basic Authentication to `/api/authenticate`
   - Server validates credentials against stored (hashed) passwords
   - Server generates a JWT token containing user information
   - Token is returned in Authorization header

2. **JWT Tokens**:
   - Generated tokens contain user ID, role, and other essential information
   - Tokens are signed with a secret key
   - Clients must include token in Authorization header for protected routes

### Authorization Rules

1. **Public Routes** (No Authentication):
   - `/api/publicUsers` endpoints

2. **User Management**:
   - Only administrators can list, create, or delete all users
   - Regular users can only view and update their own information
   - Users can modify their own data but cannot promote themselves to admin status

3. **Degree Courses**:
   - Only administrators can create, update, or delete courses
   - All authenticated users can view course information

4. **Degree Course Applications**:
   - Only administrators can view all applications
   - Regular users can only create, view, update, and delete their own applications

### Implementation

Authorization is implemented through middleware functions:
- `isAuthenticated`: Verifies the JWT token is valid
- `isAdmin`: Ensures the user has administrator privileges
- Service-level authorization: Additional checks in service methods to ensure user can only access or modify their own resources

## API Endpoints

### 1. Public Users (`/api/publicUsers`)
- **GET /api/publicUsers**: Get all users
- **GET /api/publicUsers/:userID**: Get a specific user
- **POST /api/publicUsers**: Create a new user
- **PUT /api/publicUsers/:userID**: Update a user
- **DELETE /api/publicUsers/:userID**: Delete a user

### 2. Authentication (`/api/authenticate`)
- **GET /api/authenticate**: Authenticate and get JWT token (using Basic Auth)

### 3. Users (`/api/users`)
- **GET /api/users**: Get all users (admin only)
- **GET /api/users/:userID**: Get a specific user (own user or admin)
- **POST /api/users**: Create a new user (admin only)
- **PUT /api/users/:userID**: Update a user (own user or admin)
- **DELETE /api/users/:userID**: Delete a user (admin only)

### 4. Degree Courses (`/api/degreeCourses`)
- **GET /api/degreeCourses**: Get all degree courses
- **GET /api/degreeCourses?universityShortName=X**: Search courses by university
- **GET /api/degreeCourses/:id**: Get a specific degree course
- **POST /api/degreeCourses**: Create a new degree course (admin only)
- **PUT /api/degreeCourses/:id**: Update a degree course (admin only)
- **DELETE /api/degreeCourses/:id**: Delete a degree course (admin only)

### 5. Degree Course Applications (`/api/degreeCourseApplications`)
- **GET /api/degreeCourseApplications**: Get all applications (admin) or own applications (user)
- **GET /api/degreeCourseApplications/:id**: Get a specific application
- **POST /api/degreeCourseApplications**: Create a new application
- **PUT /api/degreeCourseApplications/:id**: Update an application
- **DELETE /api/degreeCourseApplications/:id**: Delete an application

## Database Models

### 1. User Model
```typescript
interface IUser {
  userID: string;       // Unique identifier (required)
  password: string;     // Hashed password (required)
  firstName: string;    // User's first name
  lastName: string;     // User's last name
  isAdministrator: boolean; // Admin flag (default: false)
  id?: string;          // MongoDB _id mapped to id
}
```

### 2. DegreeCourse Model
```typescript
interface IDegreeCourse {
  id?: string;                // MongoDB _id mapped to id
  name: string;               // Full name (e.g., "Medieninformatik Bachelor")
  shortName: string;          // Abbreviated name (e.g., "MI-B")
  universityName: string;     // University offering the program
  universityShortName: string; // University abbreviation
  departmentName: string;     // Department name
  departmentShortName: string; // Department abbreviation
}
```

### 3. DegreeCourseApplication Model
```typescript
interface IDegreeCourseApplication {
  id?: string;                // MongoDB _id mapped to id
  applicantUserID: string;    // User ID of the applicant
  degreeCourseID: string;     // ID of the degree program
  targetPeriodYear: number;   // Application year
  targetPeriodShortName: string; // Semester ("WiSe" or "SoSe")
}
```

## Key Concepts

### 1. RESTful API Design

The project follows RESTful principles:
- Resources are identified by URLs
- HTTP methods (GET, POST, PUT, DELETE) define operations
- Appropriate HTTP status codes are returned
- JSON is used as the data exchange format

### 2. Token-Based Authentication

The server uses JWT (JSON Web Tokens) for authentication:
- Tokens are issued upon successful login
- Tokens contain user information (payload)
- Tokens are signed to prevent tampering
- Authentication middleware verifies tokens

### 3. Password Security

Passwords are securely stored using bcrypt:
- Pre-save hooks automatically hash passwords
- Password comparisons are done securely
- Original passwords are never stored

### 4. Error Handling

The server implements proper error handling:
- Appropriate HTTP status codes for different errors
- Meaningful error messages in JSON format
- Security considerations (not exposing sensitive information)

### 5. Database Modeling with Mongoose

Mongoose is used for MongoDB interactions:
- Schemas define data structure
- Middleware hooks for data transformation
- Virtual properties and transformation for JSON output

## Testing

The project includes test files in the `/tests` directory:
- `test.http`: Tests public endpoints (Milestone 1)
- `test2.http`: Tests authenticated endpoints (Milestone 2)
- `test3.http`: Tests degree course applications (Milestone 3)

These HTTP files can be executed with the REST Client extension in VS Code to verify:
- CRUD operations for all resources
- Authentication and authorization
- Error handling and edge cases
