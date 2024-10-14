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
        username: String!
        email: String!
        tel: String!
        id_no: String!
        password: String!
        confirmPassword: String!
    }

    input LoginInput {
        email: String!
        password: String!
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
        city: String!
        street: String!
        name: String!
    }

    # Rooms
    type Room {
        id: ID!
        room_no: String!
        size: Int
        status: RoomStatus
        rent: Float!            # Include rent in the Room type
        floor: Int              # Include floor in the Room type
        houseId: ID!
        house: House 
        createdAt: String
        updatedAt: String
        tenantId: ID
        tenant: User
    }

    input RoomInput {
        room_no: String!
        size: Int
        houseId: ID! 
        tenantId: ID
        rent: Float!       
        floor: Int 
    }

       # Other Charges
       type OtherCharge {
        name: String!
        amount: Float!
    }

    # Input for Other Charges
    input OtherChargeInput {
        name: String!
        amount: Float!
    }

    # Rent
    type Rent {
        id: ID!
        roomId: ID
        waterBill: String
        garbageCharge: String
        rent: String
        status: RentStatus
        otherCharges: [OtherCharge!]! # Array of OtherCharge
        createdAt: String  
        updatedAt: String 
    }

    input RentInput {
        waterBill: String!
        garbageCharge: String!
        rent: String!
        roomId: ID!
        otherCharges: [OtherChargeInput!]! # Array of OtherChargeInput

    }

    # Enum for Room Status
    enum RoomStatus {
        VACANT
        RENTED
        ON_NOTICE
    }




    # Enum for Rent Status
    enum RentStatus {
        PAID
        UNPAID
        ARREARS
    }

    # Queries
    type Query {
        message(id: ID!): Message
        user(id: ID!): User
        users: [User]
        houses: [House]                # Get all houses
        house(id: ID!): House          # Get a single house by ID
        rooms: [Room]                  # Get all rooms
        room(id: ID!): Room            # Get a single room by ID
        rents: [Rent]                  # Get all rents
        rent(id: ID!): Rent            # Get a single rent by ID
    }

    # Mutations
    type Mutation {
        createMessage(messageInput: MessageInput): Message!
        
        # User registration
        registerUser(registerInput: RegisterInput): User!
        
        # User login
        loginUser(loginInput: LoginInput): User!
        
        # Room operations
        createRoom(roomInput: RoomInput): Room!
        updateRoomStatus(id: ID!, status: RoomStatus!): Room!
        deleteRoom(id: ID!): Room!

        # House operations
        createHouse(houseInput: HouseInput): House!
        updateHouse(id: ID!, houseInput: HouseInput): House! 
        deleteHouse(id: ID!): House!      
        
        # Rent operations
        createRent(rentInput: RentInput): Rent!
        updateRentStatus(id: ID!, status: RentStatus!): Rent!
        deleteRent(id: ID!): Rent!
    }
`;
