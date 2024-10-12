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



# users registration

type User {
    username: String
    email: String
    tel: String
    id_no: String
    role: String
    password: String
    token: String
}

input RegisterInput {
    username: String
    email: String
    tel: String
    id_no: String
    password: String
}

input LoginInput {
    email: String
    password: String
}












type Query {
    message(id: ID!): Message
    user(id: ID!): User
}

type Mutation {
    createMessage(messageInput: MessageInput): Message!

    # users registration
    registerUser(registerInput: RegisterInput): User!

    # users login

    loginUser(loginInput: LoginInput): User!
}
`;
