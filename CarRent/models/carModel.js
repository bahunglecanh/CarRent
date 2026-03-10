import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    carNumber: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["available", "rented", "maintenance"],
        default: "available"
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    features: {
        type: [String]
    }
});

export default mongoose.model('Car', carSchema);