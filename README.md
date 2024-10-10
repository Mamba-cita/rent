# GraphQL Property Management API

## Overview

This is a project for managing properties, tenants, and users in a property management system.

## BE Features

- User registration and login
- CRUD operations for houses
- CRUD operations for tenants
- Role-based access control (Admin and Tenant)
- Status management for houses (Vacant, Rented, On Notice)

## Technologies Used

- Node.js
- Express
- GraphQL
- MongoDB
- Mongoose
- bcryptjs (for password hashing)
- jsonwebtoken (for authentication)

## Getting Started

### Prerequisites

- Node.js
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/rent.git
   cd rent
   ```

2. Install the dependencies:

   ```bash
   yarn/npm install
   ```

3. Set up environment variables. Create a `.env` file in the root directory with the following content:

   ```plaintext
   JWT_SECRET=your_jwt_secret
   MONGODB_URL=your_mongodb_connection_string
   ```

4. Start the application:

   ```bash
   yarn/npm start
   ```

5. The server will run on `http://localhost:5000`.

### API Endpoints

The following are the main GraphQL operations available:

#### Queries

- `houses`: Get a list of all houses.
- `house(id: ID!)`: Get a specific house by ID.
- `tenants`: Get a list of all tenants.
- `tenant(id: ID!)`: Get a specific tenant by ID.

#### Mutations

- `registerUser(name: String!, email: String!, tel: String!, id_no: String!, role: String!, password: String!)`: Register a new user.
- `loginUser(email: String!, password: String!)`: Log in an existing user and receive a JWT token.
- `addHouse(size: String!, house_no: String!, floor_no: String!, rent: String!, status: String)`: Add a new house.
- `addTenant(name: String!, email: String!, tel: String!, id_no: String!, houseId: ID!)`: Add a new tenant to a house.
- `updateHouseStatus(id: ID!, status: String!)`: Update the status of a house.
- `giveNotice(houseId: ID!)`: Tenant gives notice to vacate.
- `removeTenant(id: ID!)`: Remove a tenant from the system.

### Example Queries

Here's an example of how to query the API:

```graphql
query {
  houses {
    id
    size
    house_no
    rent
    status
  }
}
```

### Example Mutations

Here's an example of how to register a user:

```graphql
mutation {
  registerUser(name: "John Doe", email: "john@example.com", tel: "1234567890", id_no: "12345678", role: "Admin", password: "password123") {
    id
    name
    email
    role
    token
  }
}
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.