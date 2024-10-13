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

    # Houses

    type House {
        id: ID!
        city: String
        street: String
        name: String
        createdAt: String  
        updatedAt: String 
    }

    input HouseInput {
        city: String
        street: String
        name: String
    }

    # Rooms

    type Room {
        id: ID!
        room_no: String
        size: Int
        status: RoomStatus
        houseId: ID!
        house: House 
        createdAt: String
        updatedAt: String
        tenantId: ID
        tenant: User
    }

    input RoomInput {
        room_no: String
        size: Int
        houseId: ID! 
    }

    # Enum for Room Status
    enum RoomStatus {
        VACANT
        RENTED
        ON_NOTICE
    }

    type Query {
        message(id: ID!): Message
        user(id: ID!): User
        users: [User]
        houses: [House]                # Get all houses
        house(id: ID!): House          # Get a single house by ID
        rooms: [Room]                  # Get all rooms
        room(id: ID!): Room            # Get a single room by ID
    }

    type Mutation {
        createMessage(messageInput: MessageInput): Message!
        
        # Users registration
        registerUser(registerInput: RegisterInput): User!
        
        # Users login
        loginUser(loginInput: LoginInput): User!
        
        # Room operations
        createRoom(roomInput: RoomInput): Room!
        updateRoomStatus(id: ID!, status: RoomStatus!): Room!
        deleteRoom(id: ID!): Room!

        # House operations
        createHouse(houseInput: HouseInput): House!
        updateHouse(id: ID!, houseInput: HouseInput): House! 
        deleteHouse(id: ID!): House!                    
    }
`;
