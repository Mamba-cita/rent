const House = require("../../models/House");
const { ApolloError } = require("apollo-server");

module.exports = {
    Query: {
        async houses() {
            return await House.find();
        },
        async house(_, { id }) {
            const house = await House.findById(id);
            if (!house) {
                throw new ApolloError("House not found", "HOUSE_NOT_FOUND");
            }
            return house;
        }
    },
    Mutation: {
        async createHouse(_, { houseInput }) {
            const { city, street, name } = houseInput;

            const newHouse = new House({
                city,
                street,
                name
            });

            try {
                const createdHouse = await newHouse.save();
                return createdHouse;
            } catch (error) {
                throw new ApolloError("Error creating house: " + error.message);
            }
        },
        async updateHouse(_, { id, houseInput }) {
            const { city, street, name } = houseInput;

            const updatedHouse = await House.findByIdAndUpdate(
                id,
                { city, street, name },
                { new: true }
            );

            if (!updatedHouse) {
                throw new ApolloError("House not found", "HOUSE_NOT_FOUND");
            }
            return updatedHouse;
        },
        async deleteHouse(_, { id }) {
            const deletedHouse = await House.findByIdAndDelete(id);
            if (!deletedHouse) {
                throw new ApolloError("House not found", "HOUSE_NOT_FOUND");
            }
            return deletedHouse;
        }
    }
};
