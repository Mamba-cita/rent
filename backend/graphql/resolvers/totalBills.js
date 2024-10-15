const Rent = require("../../models/Rent");

module.exports = {
  Query: {
    async getTotalCharges(_, args) {
      try {
        const rents = await Rent.find();
        console.log("Fetched rents:", rents);

        let totalWaterBills = 0;
        let totalGarbageCharge = 0;
        let totalOtherCharges = 0;
        let totalPaid = 0;
        let totalUnpaid = 0;
        let totalArrears = 0;

        rents.forEach((rent) => {
          const waterBill = parseFloat(rent.waterBill) || 0;
          const garbageCharge = parseFloat(rent.garbageCharge) || 0;
          const rentAmount = parseFloat(rent.rent) || 0;

          totalWaterBills += waterBill;
          totalGarbageCharge += garbageCharge;

          if (Array.isArray(rent.otherCharges)) {
            rent.otherCharges.forEach((charge) => {
              totalOtherCharges += charge.amount || 0;
            });
          }

          switch (rent.status) {
            case 'PAID':
              totalPaid += 1;
              break;
            case 'UNPAID':
              totalUnpaid += 1;
              break;
            case 'ARREARS':
              totalArrears += 1;
              break;
            default:
              break;
          }
        });

        return {
          totalWaterBills,
          totalGarbageCharge,
          totalOtherCharges,
          totalPaid,
          totalUnpaid,
          totalArrears,
        };
      } catch (error) {
        console.error("Error fetching rent totals:", error);
        throw new Error("Failed to fetch total charges");
      }
    },
  },
};
