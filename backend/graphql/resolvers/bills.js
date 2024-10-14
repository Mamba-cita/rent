const { ApolloError } = require('apollo-server');
const Bill = require('../models/Bill');

module.exports = {
  Query: {
    // Fetch all bills
    async bills() {
      try {
        return await Bill.find();
      } catch (error) {
        throw new ApolloError('Error fetching bills: ' + error.message);
      }
    },

    // Fetch a single bill by ID
    async bill(_, { id }) {
      try {
        const bill = await Bill.findById(id);
        if (!bill) {
          throw new ApolloError('Bill not found', 'BILL_NOT_FOUND');
        }
        return bill;
      } catch (error) {
        throw new ApolloError('Error fetching bill: ' + error.message);
      }
    },
  },

  Mutation: {
    // Create a new bill
    async createBill(_, { billInput }) {
      const { roomId, rent, waterBill, garbageCharge } = billInput;
      try {
        const newBill = new Bill({
          roomId,
          rent,
          waterBill,
          garbageCharge,
        });

        const createdBill = await newBill.save();
        return createdBill;
      } catch (error) {
        throw new ApolloError('Error creating bill: ' + error.message);
      }
    },

    // Update an existing bill
    async updateBill(_, { id, billInput }) {
      const { rent, waterBill, garbageCharge } = billInput;
      try {
        const updatedBill = await Bill.findByIdAndUpdate(
          id,
          {
            rent,
            waterBill,
            garbageCharge,
          },
          { new: true, runValidators: true } // runValidators to enforce schema validations
        );
        if (!updatedBill) {
          throw new ApolloError('Bill not found', 'BILL_NOT_FOUND');
        }
        return updatedBill;
      } catch (error) {
        throw new ApolloError('Error updating bill: ' + error.message);
      }
    },

    // Delete a bill
    async deleteBill(_, { id }) {
      try {
        const deletedBill = await Bill.findByIdAndRemove(id);
        if (!deletedBill) {
          throw new ApolloError('Bill not found', 'BILL_NOT_FOUND');
        }
        return deletedBill;
      } catch (error) {
        throw new ApolloError('Error deleting bill: ' + error.message);
      }
    },
  },
};
