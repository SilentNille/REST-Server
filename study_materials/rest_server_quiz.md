# REST Server Quiz Questions

## Multiple Choice Questions

### Basic REST Concepts

**1. Which of the following HTTP methods should be used to update an existing user?**
- A) GET
- B) POST
- C) PUT
- D) DELETE

**2. Which HTTP status code is most appropriate for a successful creation of a new resource?**
- A) 200 OK
- B) 201 Created
- C) 204 No Content
- D) 400 Bad Request

**3. In a RESTful API, what does the "S" in REST stand for?**
- A) Service
- B) System
- C) State
- D) Standard

**4. Which approach to API versioning is used in this project?**
- A) URL path versioning (e.g., `/api/v1/users`)
- B) Query parameter versioning (e.g., `/api/users?version=1`)
- C) Header-based versioning (using custom headers)
- D) No versioning is implemented

**5. What is the recommended naming convention for REST API resource endpoints?**
- A) Singular nouns (e.g., `/user`)
- B) Plural nouns (e.g., `/users`)
- C) Verbs (e.g., `/getUser`)
- D) Camel case with verbs (e.g., `/retrieveUser`)

### Authentication & Authorization

**6. What authentication mechanism is used for the initial login in this project?**
- A) OAuth 2.0
- B) API Key
- C) Basic Authentication
- D) Form-based Authentication

**7. After successful authentication, what security mechanism is used for subsequent requests?**
- A) Session cookies
- B) JSON Web Tokens (JWT)
- C) API keys
- D) OAuth refresh tokens

**8. Where should a JWT token be included in subsequent requests to authenticate the user?**
- A) In the request body
- B) In the URL query parameters
- C) In the Authorization header
- D) In a custom header

**9. In this project, which middleware function verifies if a user has admin privileges?**
- A) `verifyUser`
- B) `isAdmin`
- C) `checkAdminRole`
- D) `hasAdminPermission`

**10. What information is typically included in a JWT token payload in this project?**
- A) User's password
- B) Complete user profile
- C) User ID and role information
- D) Database connection details

### Project Structure & Components

**11. Which file serves as the main entry point for the REST server application?**
- A) `server.js`
- B) `index.ts`
- C) `app.ts`
- D) `HttpServer.ts`

**12. How is password security implemented in the User model?**
- A) Passwords are encrypted using AES
- B) Passwords are stored in plain text
- C) Passwords are hashed using bcrypt
- D) Passwords are encoded with Base64

**13. Which database is used in this project for data persistence?**
- A) MySQL
- B) PostgreSQL
- C) MongoDB
- D) SQLite

**14. What is the purpose of the `/api/publicUsers` endpoint in this project?**
- A) It's used for public-facing documentation
- B) It provides user registration without authentication
- C) It's a test endpoint from Milestone 1 that returns password hashes
- D) It serves as a read-only view of user profiles

**15. Which pattern is used to organize code in the project?**
- A) Microservices architecture
- B) MVC (Model-View-Controller)
- C) Resource-based modular architecture
- D) Event-driven architecture

### TypeScript & Implementation

**16. What does the `IUser` interface define in the project?**
- A) User authentication methods
- B) User data structure and types
- C) User interface components
- D) User permission rules

**17. How are MongoDB's default `_id` fields handled in API responses?**
- A) They are removed entirely from responses
- B) They are kept as `_id` fields
- C) They are mapped to `id` fields using schema transformations
- D) They are encrypted before being sent to clients

**18. What hook is used to hash passwords before saving a new user?**
- A) `beforeCreate`
- B) `pre('save')`
- C) `onSave`
- D) `afterValidate`

**19. How does the server handle HTTPS?**
- A) HTTPS is not supported
- B) It uses a reverse proxy for HTTPS
- C) It directly provides HTTPS with SSL certificates
- D) It redirects HTTP requests to HTTPS

**20. In this project, how is the default admin user created?**
- A) It's hardcoded in the database schema
- B) It's created automatically when the server starts if it doesn't exist
- C) It's created manually through a setup script
- D) It's imported from a configuration file

### API Design & Best Practices

**21. What is the proper way to search for degree courses by university in this API?**
- A) `GET /api/degreeCourses/searchByUniversity/{universityName}`
- B) `POST /api/degreeCourses/search` with university in request body
- C) `GET /api/degreeCourses?universityShortName={universityName}`
- D) `GET /api/universities/{universityName}/degreeCourses`

**22. Which HTTP status code should be returned when a user tries to access a resource they don't have permission for?**
- A) 400 Bad Request
- B) 401 Unauthorized
- C) 403 Forbidden
- D) 404 Not Found

**23. In REST API design, what is HATEOAS?**
- A) A security protocol for APIs
- B) A response format including links to related resources
- C) A design pattern for handling authentication
- D) A method for API versioning

**24. Which of the following is NOT a valid authorization rule in this project?**
- A) Regular users can view all degree courses
- B) Only administrators can delete users
- C) Regular users can view their own applications
- D) Regular users can modify the administrator status of other users

**25. What is the recommended approach for error responses in REST APIs?**
- A) Return text messages describing the error
- B) Return appropriate HTTP status codes with JSON error details
- C) Always return 200 OK with error information in the body
- D) Redirect to an error page

## Answer Key

1. C
2. B
3. C
4. D
5. B
6. C
7. B
8. C
9. B
10. C
11. D
12. C
13. C
14. C
15. C
16. B
17. C
18. B
19. C
20. B
21. C
22. C
23. B
24. D
25. B

## Explanation of Answers

**1. C) PUT** - PUT is used to update existing resources.

**2. B) 201 Created** - 201 is the appropriate status code when a new resource has been successfully created.

**3. C) State** - REST stands for Representational State Transfer.

**4. D) No versioning is implemented** - The project doesn't use API versioning.

**5. B) Plural nouns** - RESTful APIs typically use plural nouns to represent resource collections.

**6. C) Basic Authentication** - The project uses Basic Authentication for the initial login.

**7. B) JSON Web Tokens (JWT)** - After authentication, the server issues a JWT for subsequent requests.

**8. C) In the Authorization header** - JWT tokens should be included in the Authorization header with the format "Bearer [token]".

**9. B) isAdmin** - The middleware function that checks admin privileges is called isAdmin.

**10. C) User ID and role information** - JWT tokens typically contain the user ID and role information (e.g., isAdministrator flag).

**11. D) HttpServer.ts** - This is the main entry point that sets up the Express app and starts the server.

**12. C) Passwords are hashed using bcrypt** - Bcrypt is used to securely hash passwords before storing them.

**13. C) MongoDB** - The project uses MongoDB with Mongoose for data persistence.

**14. C) It's a test endpoint from Milestone 1 that returns password hashes** - This endpoint is specifically for testing and includes password hashes in responses.

**15. C) Resource-based modular architecture** - The code is organized by resources (users, degreeCourses, etc.).

**16. B) User data structure and types** - The IUser interface defines the structure and data types for user objects.

**17. C) They are mapped to id fields using schema transformations** - MongoDB _id fields are mapped to id in the response using Mongoose's toJSON transform.

**18. B) pre('save')** - This Mongoose middleware hook runs before a document is saved.

**19. C) It directly provides HTTPS with SSL certificates** - The server uses HTTPS with SSL certificates loaded from the certificates directory.

**20. B) It's created automatically when the server starts if it doesn't exist** - The createDefaultAdmin function runs at server startup.

**21. C) GET /api/degreeCourses?universityShortName={universityName}** - This is the RESTful way to filter resources by a property.

**22. C) 403 Forbidden** - 403 indicates that the server understands the request but refuses to authorize it.

**23. B) A response format including links to related resources** - HATEOAS (Hypermedia as the Engine of Application State) includes links to related actions in responses.

**24. D) Regular users can modify the administrator status of other users** - This is not allowed; only administrators can modify administrator status.

**25. B) Return appropriate HTTP status codes with JSON error details** - REST APIs should return appropriate status codes and structured error information.
