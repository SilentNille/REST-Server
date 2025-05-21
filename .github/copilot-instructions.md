# REST Server Project Guidelines

## Project Overview
This repository contains a REST server implementation for a university course project, focused on providing APIs for user management and degree course management. The project is built entirely in TypeScript as per course requirements.

## Project Structure
- **HttpServer.ts**: Main server entry point
- **db/**: Database connection and configuration
- **endpoints/**: API endpoints organized by resource
  - **authenticate/**: Authentication endpoints and middleware
  - **degreeCourses/**: Degree course management
  - **users/**: User management
  - **test/**: Test routes
- **tests/**: HTTP request test files

## Documentation

The project includes several documentation files in the `.github` folder:

- [Project Overview](./project-overview.md): Comprehensive overview of the project architecture, components, and workflows
- [Full Task Description](./full-task.md): Complete project requirements as specified by the course instructor
- [Milestone 1](./milestone1.md): Requirements and implementation details for the basic REST server with public user endpoints
- [Milestone 2](./milestone2.md): Requirements for authentication, protected user endpoints, and degree course management
- [Best Practices](./best-practices.md): Coding standards and REST API design principles to follow
- [Security Guidelines](./secruity.md): Authentication, authorization, and data protection requirements

## Key Technologies
- TypeScript (strict mode)
- Express.js for the HTTP server
- MongoDB with Mongoose for data modeling
- JWT for authentication
- bcrypt for password hashing

## Project Requirements
- All code must be written in TypeScript
- Must implement RESTful principles
- Proper authentication and authorization
- MongoDB for data persistence
- Comprehensive error handling

## Similar Projects
While this project shares similarities with other projects like the [ChatApp-Backend](https://github.com/EricCpy/ChatApp-Backend), it is implemented strictly in TypeScript and has a different focus on academic resources management rather than chat functionality.

ALso is here from antoher student who has the same homework but does things weirdly and I dont want to copy from him, but here you can get what is needed: [ChatApp-Backend](https://github.com/ptxcy/REST-Server)

## Recommended Development Practices
- Follow TypeScript best practices
- Implement proper type definitions for all models
- Use middleware for authentication and authorization
- Properly validate all input data
- Implement comprehensive error handling
- Follow the proper RESTful API design principles
