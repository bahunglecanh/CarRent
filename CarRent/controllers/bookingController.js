import Booking from '../models/bookingModel.js';
import Car from '../models/carModel.js';

export const getAllBookings = async (req, res) => { // [cite: 46]
    try {
        const bookings = await Booking.find();
        console.log(bookings);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBooking = async (req, res) => { // [cite: 48]
    try {
        const { customerName, carNumber, startDate, endDate } = req.body;
        const sDate = new Date(startDate); // [cite: 50]
        const eDate = new Date(endDate); // [cite: 50]

        // Lấy thông tin xe để có pricePerDay [cite: 57]
        const car = await Car.findOne({ carNumber });
        if (!car) return res.status(404).json({ message: "Car not found" });

        // Kiểm tra trùng lịch [cite: 51]
        const conflict = await Booking.findOne({
            carNumber,
            $or: [{ startDate: { $lte: eDate }, endDate: { $gte: sDate } }]
        });
        if (conflict) return res.status(400).json({ message: "Car is already booked for these dates" });

        // Tính toán số tiền: (endDate - startDate) / (ms trong 1 ngày) [cite: 57]
        const diffTime = Math.abs(eDate - sDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalAmount = diffDays * car.pricePerDay;

        const newBooking = new Booking({
            customerName,
            carNumber,
            startDate: sDate,
            endDate: eDate,
            totalAmount
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getActiveBookings = async (req, res) => {
    try {
        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const activeBookings = await Booking.find({
            endDate: { $exists: false },
            startDate: { $gte: twentyFourHoursAgo, $lte: now }
        });

        res.status(200).json(activeBookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const pickupCar = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingId);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        const now = new Date();
        const startDate = new Date(booking.startDate);

        if (now < startDate) {
            return res.status(400).json({
                message: `Chưa đến ngày nhận xe. startDate là ${startDate.toISOString()}`
            });
        }

        booking.status = 'đã đón';
        booking.pickupAt = now;
        await booking.save();

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBooking = async (req, res) => { // [cite: 52]
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.bookingId, req.body, { new: true });
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBooking = async (req, res) => { // [cite: 54]
    try {
        await Booking.findByIdAndDelete(req.params.bookingId);
        res.status(200).json({ message: "Booking deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};