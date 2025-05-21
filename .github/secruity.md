# Security Guidelines for REST Server

## Table of Contents
- [Authentication](#authentication)
- [Authorization](#authorization)
- [Data Protection](#data-protection)
- [API Security](#api-security)
- [Configuration Best Practices](#configuration-best-practices)

## Authentication

### JWT Authentication
- The server uses JSON Web Tokens (JWT) for authentication
- Tokens are generated upon successful login via Basic Authentication
- Tokens should be included in the Authorization header with the Bearer prefix
- Token validation happens in the middleware before processing protected routes

### Password Security
- All passwords must be hashed using bcrypt with appropriate salt rounds
- Never store plaintext passwords in the database
- Password hashes should only be visible in the `publicUsers` endpoint for testing purposes

## Authorization

### User Permissions
- **Administrator Users**:
  - Can manage all users (create, update, delete)
  - Can view all users in the system
  - Can manage all degree courses
  - Can manage all degree course applications

- **Regular Users**:
  - Can only view and update their own user information
  - Can view all degree courses
  - Can only manage their own degree course applications
  - Cannot create or modify other users

### Permission Implementation
- Authorization checks should be implemented in both route middleware and service layers
- Use the `isAdministrator` flag from the JWT token for authorization decisions

## Data Protection

- Sensitive data (passwords) should never be returned in API responses (except in publicUsers endpoint)
- Implement proper data filtering before sending responses
- Use HTTPS for all communications in production

## API Security

- Validate all inputs to prevent injection attacks
- Implement proper error handling without revealing sensitive system information
- Use appropriate HTTP status codes for different error conditions
- Set proper CORS headers to restrict access to trusted domains

## Configuration Best Practices

- Store sensitive configuration in environment variables
- Use `.env` files for development, but never commit them to the repository
- JWT secrets should be strong and unique for each environment
- Database connection strings should be configured via environment variables

## Security Testing

- Regularly test authentication and authorization flows
- Verify that unauthorized access is properly prevented
- Ensure password hashing is working correctly
- Test API endpoints with invalid inputs to ensure proper validation