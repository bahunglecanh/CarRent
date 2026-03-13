import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bookingRoutes from './routes/bookingRoutes.js';
import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ─── View Engine ──────────────────────────────────────────────
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ─── Middleware ───────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Cho phép parse form data từ UI
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// ─── Web UI Routes ────────────────────────────────────────────
app.get('/', (req, res) => {
    res.render('index');
});


// ─── Database ─────────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/CartRent';

mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
})
    .then(() => console.log(`✅ MongoDB Connected: ${MONGODB_URI}`))
    .catch(err => console.log('❌ MongoDB connection error:', err.message));

app.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            message: 'Database chưa kết nối. Vui lòng kiểm tra kết nối mạng.',
            dbState: mongoose.connection.readyState
        });
    }
    next();
});

// ─── Routes ───────────────────────────────────────────────────
app.use('/auth', authRoutes);
app.use('/bookings', bookingRoutes);
app.use('/cars', carRoutes);
app.use('/health', (req, res) => res.status(200).send('oke'));

// ─── Start Server ─────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));