# REST Server Project Overview

## Table of Contents
- [Project Architecture](#project-architecture)
- [Key Components](#key-components)
- [Authentication Flow](#authentication-flow)
- [Authorization System](#authorization-system)
- [API Documentation](#api-documentation)
- [Testing Strategy](#testing-strategy)

## Project Architecture

This REST server follows a modular architecture pattern organized around resources and features. The codebase is structured to separate concerns and improve maintainability:

```
HttpServer.ts                  # Main application entry point
├── db/                        # Database connection management
├── endpoints/                 # API endpoints grouped by resource
│   ├── authenticate/          # Authentication endpoints
│   ├── degreeCourses/         # Degree course management
│   ├── users/                 # User management (authenticated)
│   └── publicUsers/           # Public user management (no auth)
└── tests/                     # HTTP test files
```

## Key Components

### HttpServer.ts
The main entry point that configures Express, connects middleware, registers routes, and starts the server. It also initializes the database connection and creates the default admin user if needed.

### Database Layer
- **Database.ts**: Manages the connection to MongoDB using Mongoose.
- **Models**: Define data structures using TypeScript interfaces and Mongoose schemas.

### Service Layer
Each resource has its own service file (e.g., `UserService.ts`, `DegreeCourseService.ts`) that contains the business logic, database operations, and validation.

### Route Layer
Route files (e.g., `UserRoute.ts`, `DegreeCourseRoute.ts`) define the API endpoints and connect them to the appropriate service methods. They also apply middleware like authentication and authorization.

### Authentication System
The `authenticate` module handles user authentication via Basic Auth and generates JWT tokens for subsequent requests.

## Authentication Flow

1. **Login Process**:
   - User sends credentials via Basic Authentication to `/api/authenticate`
   - Server validates credentials against stored (hashed) passwords
   - On success, server generates a JWT token and returns it in the Authorization header

2. **Secured Endpoints**:
   - Client includes the JWT token in the Authorization header of requests
   - The `verifyToken` middleware validates the token before allowing access
   - The decoded user information is attached to the request for use in authorization checks

## Authorization System

Authorization is implemented using a combination of middleware and service-level checks:

- **Middleware Checks**:
  - `verifyToken`: Ensures the user is authenticated
  - `verifyAdmin`: Ensures the user has administrator privileges

- **Service-Level Checks**:
  - Verify user ownership of resources
  - Apply specific business rules for each resource type

## API Documentation

### Public Endpoints (No Authentication)

- **GET /api/publicUsers**: Get all users
- **GET /api/publicUsers/:userID**: Get a specific user
- **POST /api/publicUsers**: Create a new user
- **PUT /api/publicUsers/:userID**: Update a user
- **DELETE /api/publicUsers/:userID**: Delete a user

### Authentication

- **GET /api/authenticate**: Authenticate user and get JWT token

### Protected Endpoints (Authentication Required)

#### Users
- **GET /api/users**: Get all users (admin only)
- **GET /api/users/:userID**: Get a specific user (own user or admin)
- **POST /api/users**: Create a new user (admin only)
- **PUT /api/users/:userID**: Update a user (own user or admin)
- **DELETE /api/users/:userID**: Delete a user (admin only)

#### Degree Courses
- **GET /api/degreeCourses**: Get all degree courses
- **GET /api/degreeCourses/:id**: Get a specific degree course
- **POST /api/degreeCourses**: Create a degree course (admin only)
- **PUT /api/degreeCourses/:id**: Update a degree course (admin only)
- **DELETE /api/degreeCourses/:id**: Delete a degree course (admin only)

## Testing Strategy

Testing is done using HTTP request files that can be executed in VS Code with the REST Client extension:

1. **test.http**: Tests public endpoints ([Milestone 1](./milestone1.md))
2. **test2.http**: Tests authenticated endpoints ([Milestone 2](./milestone2.md))
3. **test3.http**: Tests degree course applications ([Milestone 3](./milestone3.md))

These files contain a series of HTTP requests that verify all API functionality, including:
- CRUD operations for all resources
- Authentication and authorization
- Error handling
- Edge cases

Each test verifies that the server returns the expected status codes and response formats.
