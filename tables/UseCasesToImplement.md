# Use Cases to be Implemented

| Use Case ID | Description                                      | Required Implementation Details         |
|-------------|--------------------------------------------------|-----------------------------------------|
| UC1         | Implement `/publicUsers` endpoint with CRUD     | Add routes for Create, Read, Update, Delete operations |
| UC2         | Ensure user search by `userID`                  | Add route to fetch user by `userID`     |
| UC3         | Validate user input                             | Add validation logic in `UserModel.ts`  |
| UC4         | Hash passwords using `bcryptjs`                 | Integrate password hashing in `UserModel.ts` |
| UC5         | Return all attributes, including hashed password| Ensure all attributes are returned in responses |
| UC6         | Add error handling for invalid operations       | Handle errors for duplicate userID, non-existent users, etc. |