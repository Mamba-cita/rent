const Room = require("../../models/Room");
const { ApolloError } = require("apollo-server");

module.exports = {
  Query: {
    async rooms() {
      try {
        return await Room.find().populate('house'); 
      } catch (error) {
        throw new ApolloError("Error fetching rooms: " + error.message);
      }
    },
    async room(_, { id }) {
      try {
        const room = await Room.findById(id).populate('house');
        if (!room) {
          throw new ApolloError("Room not found", "ROOM_NOT_FOUND");
        }
        return room;
      } catch (error) {
        throw new ApolloError("Error fetching room: " + error.message);
      }
    }
  },
  
  Mutation: {
    async createRoom(_, { roomInput }) {
      const { room_no, size, rent, floor, houseId, tenantId } = roomInput;
      
      try {
        // Default status set to 'VACANT' if no tenant is assigned
        const status = tenantId ? 'RENTED' : 'VACANT';

        // Optionally, you could validate houseId and tenantId here if needed
        
        const newRoom = new Room({
          room_no,
          size,
          rent,
          floor,
          houseId,
          tenantId,
          status
        });

        const savedRoom = await newRoom.save();
        return savedRoom.populate('house'); // Populate house after save for consistency
      } catch (error) {
        throw new ApolloError("Error creating room: " + error.message);
      }
    },

    async updateRoomStatus(_, { id, status }) {
      // Ensure the status is one of the valid values
      if (!['VACANT', 'RENTED', 'ON_NOTICE'].includes(status)) {
        throw new ApolloError("Invalid status value", "INVALID_STATUS");
      }

      try {
        const updatedRoom = await Room.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        ).populate('house'); // Populate for consistency
        if (!updatedRoom) {
          throw new ApolloError("Room not found", "ROOM_NOT_FOUND");
        }
        return updatedRoom;
      } catch (error) {
        throw new ApolloError("Error updating room status: " + error.message);
      }
    },

    async deleteRoom(_, { id }) {
      try {
        const deletedRoom = await Room.findByIdAndDelete(id).populate('house'); // Populate for consistency
        if (!deletedRoom) {
          throw new ApolloError("Room not found", "ROOM_NOT_FOUND");
        }
        return { id: deletedRoom.id, message: "Room deleted successfully.", room: deletedRoom }; // Return deleted room object
      } catch (error) {
        throw new ApolloError("Error deleting room: " + error.message);
      }
    }
  }
};
