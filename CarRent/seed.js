// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import Booking from './models/bookingModel.js';

// dotenv.config();

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/CartRent';

// // ⏰ Thời điểm hiện tại (lấy động lúc chạy seed)
// const now = new Date();

// const seedBookings = [
//     // ✅ CÒN HẠN (endDate rỗng + startDate trong 24h qua) → API sẽ trả về
//     {
//         customerName: 'Nguyen Van A',
//         carNumber: 'BKS-001',
//         startDate: new Date(now.getTime() - 1 * 60 * 60 * 1000),   // 1 giờ trước
//         // endDate: rỗng → đang active
//         totalAmount: 500000
//     },
//     {
//         customerName: 'Tran Thi B',
//         carNumber: 'BKS-002',
//         startDate: new Date(now.getTime() - 5 * 60 * 60 * 1000),   // 5 giờ trước
//         // endDate: rỗng → đang active
//         totalAmount: 750000
//     },
//     {
//         customerName: 'Le Van C',
//         carNumber: 'BKS-003',
//         startDate: new Date(now.getTime() - 23 * 60 * 60 * 1000),  // 23 giờ trước (sắp hết hạn)
//         // endDate: rỗng → đang active
//         totalAmount: 300000
//     },

//     // ❌ HẾT HẠN (endDate rỗng + startDate QUÁ 24h) → API KHÔNG trả về
//     {
//         customerName: 'Pham Thi D',
//         carNumber: 'BKS-004',
//         startDate: new Date(now.getTime() - 25 * 60 * 60 * 1000),  // 25 giờ trước
//         // endDate: rỗng nhưng quá 24h
//         totalAmount: 400000
//     },
//     {
//         customerName: 'Hoang Van E',
//         carNumber: 'BKS-005',
//         startDate: new Date(now.getTime() - 48 * 60 * 60 * 1000),  // 2 ngày trước
//         // endDate: rỗng nhưng quá 24h
//         totalAmount: 900000
//     },

//     // 🏁 ĐÃ HOÀN THÀNH (có endDate) → API KHÔNG trả về
//     {
//         customerName: 'Vo Thi F',
//         carNumber: 'BKS-006',
//         startDate: new Date(now.getTime() - 3 * 60 * 60 * 1000),   // 3 giờ trước
//         endDate: new Date(now.getTime() - 1 * 60 * 60 * 1000),     // kết thúc 1 giờ trước
//         totalAmount: 600000
//     },
// ];

// async function seed() {
//     try {
//         await mongoose.connect(MONGODB_URI);
//         console.log(`✅ Connected to: ${MONGODB_URI}`);

//         // Xóa data cũ
//         await Booking.deleteMany({});
//         console.log('🗑️  Đã xóa data cũ');

//         // Thêm data mới
//         const inserted = await Booking.insertMany(seedBookings);
//         console.log(`✅ Đã thêm ${inserted.length} bookings:\n`);

//         console.log('📦 CÒN HẠN (API /booking/active sẽ trả về):');
//         inserted.slice(0, 3).forEach(b =>
//             console.log(`  - ${b.customerName} | startDate: ${b.startDate.toISOString()} | endDate: rỗng`)
//         );

//         console.log('\n❌ HẾT HẠN (quá 24h, API KHÔNG trả về):');
//         inserted.slice(3, 5).forEach(b =>
//             console.log(`  - ${b.customerName} | startDate: ${b.startDate.toISOString()} | endDate: rỗng`)
//         );

//         console.log('\n🏁 ĐÃ HOÀN THÀNH (có endDate, API KHÔNG trả về):');
//         inserted.slice(5).forEach(b =>
//             console.log(`  - ${b.customerName} | startDate: ${b.startDate.toISOString()} | endDate: ${b.endDate.toISOString()}`)
//         );

//     } catch (err) {
//         console.error('❌ Lỗi:', err.message);
//     } finally {
//         await mongoose.disconnect();
//         console.log('\n🔌 Đã ngắt kết nối MongoDB');
//     }
// }

// seed();
