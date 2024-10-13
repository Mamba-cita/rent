const { gql } = require("apollo-server");

module.exports = gql`
type Message {
    text: String
    createdAt: String
    createdBy: String
}

input MessageInput {
    text: String
    username: String
}

# Users registration

type User {
    id: ID!
    username: String
    email: String
    tel: String
    id_no: String
    role: String
    token: String
    createdAt: String  
    updatedAt: String 
}

input RegisterInput {
    username: String
    email: String
    tel: String
    id_no: String
    password: String
    confirmPassword: String
}

input LoginInput {
    email: String
    password: String
}

# Rooms

type Room {
    room_no: String
    size: Int
    status: String
}

input RoomInput {
    room_no: String
    size: String
    status: String
}

type Query {
    message(id: ID!): Message
    user(id: ID!): User
    users: [User]
}

type Mutation {
    createMessage(messageInput: MessageInput): Message!

    # Users registration
    registerUser(registerInput: RegisterInput): User!

    # Users login
    loginUser(loginInput: LoginInput): User!
}
`;
