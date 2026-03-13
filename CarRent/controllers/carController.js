import Car from '../models/carModel.js';

export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        console.error('--- GET ALL CARS ERROR ---', error);
        res.status(500).json({ message: error.message });
    }
};

export const createCar = async (req, res) => {
    try {
        const { carNumber, capacity, pricePerDay, features } = req.body;
        const newCar = new Car({
            carNumber,
            capacity,
            pricePerDay,
            features
        });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        console.error('--- CREATE CAR ERROR ---', error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteCar = async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Car deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
