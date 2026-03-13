import express from 'express';
import { getAllCars, createCar, deleteCar } from '../controllers/carController.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);
router.get('/', getAllCars);
router.post('/', requireAdmin, createCar);
router.delete('/:id', requireAdmin, deleteCar);

export default router;
