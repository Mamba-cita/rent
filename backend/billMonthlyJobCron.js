const cron = require('node-cron');

cron.schedule('0 1 1 * *', () => { // Runs at 1 AM on the 1st day of every month
    rooms.forEach(room => {
        // Assuming you have a function to create bills
        createBillForRoom(room.id);
    });
});

const createBillForRoom = (roomId) => {
    // Logic to create a bill (could call the createBill mutation directly if using Apollo)
};
