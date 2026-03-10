import mongoose, { Schema } from 'mongoose';

const bookingSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    carNumber: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    totalAmount: {
        type: Number
    },
    status: {
        type: String,
        default: 'chờ đón'
    },
    pickupAt: {
        type: Date
    }
});

export default mongoose.model('Booking', bookingSchema);