const { ApolloError } = require("apollo-server");
const Rent = require("../../models/Rent");
const Room = require("../../models/Room");

module.exports = {
    Query: {
        // Get all rents
        rents: async () => {
            try {
                return await Rent.find();
            } catch (error) {
                throw new ApolloError('Error fetching rents: ' + error.message);
            }
        },

        // Get a single rent by ID
        rent: async (_, { id }) => {
            try {
                return await Rent.findById(id);
            } catch (error) {
                throw new ApolloError('Error fetching rent: ' + error.message);
            }
        },
    },

    Mutation: {
        // Create a new rent
        createRent: async (_, { rentInput }) => {
            const { waterBill, garbageCharge, roomId, otherCharges } = rentInput;

            try {
                // Fetch rent value from Room collection
                const room = await Room.findById(roomId).select('rent');
                
                if (!room || !room.rent) {
                    console.error('Rent value not found for roomId:', roomId); // Log for debugging
                    throw new ApolloError('Room not found or rent value is missing');
                }

                // Ensure rent value is a string (as the schema expects)
                const rentValue = String(room.rent);

                console.log('Rent value:', rentValue); // Confirm rent value is fetched

                // Create a new Rent document
                const newRent = new Rent({
                    roomId,
                    waterBill,
                    garbageCharge,
                    rent: rentValue, // Include the fetched rent value
                    otherCharges
                });

                // Save the new rent entry
                const createdRent = await newRent.save();
                return createdRent;

            } catch (error) {
                console.error('Error in createRent:', error); // Log the error details
                throw new ApolloError('Error creating rent: ' + error.message);
            }
        },

        // Update an existing rent
        updateRentStatus: async (_, { id, status }) => {
            try {
                const updatedRent = await Rent.findByIdAndUpdate(id, { status }, { new: true });
                if (!updatedRent) {
                    throw new ApolloError('Rent not found');
                }
                return updatedRent;
            } catch (error) {
                throw new ApolloError('Error updating rent status: ' + error.message);
            }
        },

        // Delete a rent
        deleteRent: async (_, { id }) => {
            try {
                const deletedRent = await Rent.findByIdAndRemove(id);
                if (!deletedRent) {
                    throw new ApolloError('Rent not found');
                }
                return deletedRent;
            } catch (error) {
                throw new ApolloError('Error deleting rent: ' + error.message);
            }
        },
    },
};
