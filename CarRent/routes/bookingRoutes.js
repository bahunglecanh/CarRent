import express from 'express';
import * as bookingController from '../controllers/bookingController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Tất cả booking routes đều yêu cầu đăng nhập
router.use(verifyToken);

router.get('/active', bookingController.getActiveBookings);
router.get('/', bookingController.getAllBookings);
router.post('/', bookingController.createBooking);
router.patch('/:bookingId/pickup', bookingController.pickupCar);
router.put('/:bookingId', bookingController.updateBooking);
router.delete('/:bookingId', bookingController.deleteBooking);

export default router;