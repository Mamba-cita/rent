const Room = require("../../models/Room");
const { ApolloError } = require("apollo-server");

module.exports = {
    Query: {
        async rooms() {
            return await Room.find().populate('house'); // Populate house details
        },
        async room(_, { id }) {
            const room = await Room.findById(id).populate('house'); // Populate house details
            if (!room) {
                throw new ApolloError("Room not found", "ROOM_NOT_FOUND");
            }
            return room;
        }
    },
    Mutation: {
        async createRoom(_, { roomInput }) {
            const { room_no, size, houseId } = roomInput;

            const newRoom = new Room({
                room_no,
                size,
                status: "VACANT",
                houseId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });

            const createdRoom = await newRoom.save();
            return createdRoom;
        },
        async updateRoomStatus(_, { id, status }) {
            const updatedRoom = await Room.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
            if (!updatedRoom) {
                throw new ApolloError("Room not found", "ROOM_NOT_FOUND");
            }
            return updatedRoom;
        },
        async deleteRoom(_, { id }) {
            const deletedRoom = await Room.findByIdAndDelete(id);
            if (!deletedRoom) {
                throw new ApolloError("Room not found", "ROOM_NOT_FOUND");
            }
            return deletedRoom;
        }
    }
};
