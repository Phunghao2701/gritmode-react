import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import orderRoutes from '../routes/orderRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.CLIENT_URL,
].filter(Boolean); // loại bỏ undefined

app.use(cors({
  origin: (origin, callback) => {
    // Cho phép requests không có origin (ví dụ: Postman, curl)
    if (!origin) return callback(null, true);
    // Cho phép Vercel domains động (*.vercel.app)
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS: ' + origin));
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API Server is running on Vercel!' });
});

// Chỉ listen khi chạy local, Vercel sẽ tự handle export
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

export default app;
