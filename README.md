
# Housing Management System

A housing management system built with React and GraphQL, allowing users to manage properties, tenants, and rent tracking efficiently.

## Table of Contents
- [Housing Management System](#housing-management-system)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Usage](#usage)
    - [GraphQL API](#graphql-api)
      - [Types](#types)
      - [Queries](#queries)
      - [Mutations](#mutations)
    - [React Router](#react-router)
  - [GraphQL Schema](#graphql-schema)
    - [Example of Room Input](#example-of-room-input)
  - [Contributing](#contributing)
  - [License](#license)
    - [Notes](#notes)

## Features
- User registration and login.
- Role-based access control for tenants and administrators.
- Management of houses and rooms.
- Tracking of rent payments and other charges.
- Real-time messaging system.
- Analytics dashboard for insights.

## Tech Stack
- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express, Apollo Server
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mamba-cita/rent.git
   ```

2. Navigate to the project directory:
   ```bash
   cd rent
   ```

3. Install the dependencies for both the client and server:
   ```bash
   yarn/npm install
   ```

4. Start the development server:
   ```bash
   yarn/npm run dev
   ```

5. Open your browser and visit `http://localhost:3000`.

## Usage

### GraphQL API
The GraphQL schema provides the following types and operations:

#### Types
- **User**
- **House**
- **Room**
- **Rent**
- **Message**

#### Queries
- `users`: Retrieve a list of all users.
- `houses`: Retrieve a list of all houses.
- `rooms`: Retrieve a list of all rooms.
- `rents`: Retrieve a list of all rents.

#### Mutations
- `registerUser`: Register a new user.
- `loginUser`: Log in a user.
- `createHouse`: Create a new house.
- `createRoom`: Create a new room.
- `createRent`: Create a new rent entry.

### React Router
The application uses React Router for navigation, with role-based protected routes for users and tenants. The routes include:

- `/`: Dashboard (analytics)
- `/vacants`: View vacant rooms
- `/tenants`: Manage tenants
- `/houses`: Manage houses
- `/rooms`: Manage rooms
- `/settings`: User settings
- `/login`: Login page
- `/register`: Registration page

## GraphQL Schema

The GraphQL schema is defined as follows:

```graphql
# Define your GraphQL types, queries, and mutations here
```

### Example of Room Input
```graphql
input RoomInput {
    room_no: String!
    size: Int
    houseId: ID!
    rent: Float!
    floor: Int
}
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Notes
- Replace placeholder values (like repository links) with your actual details.
- Update the GraphQL schema section with the full schema or relevant snippets as needed.
- Ensure the usage section accurately reflects how to interact with your application and API.