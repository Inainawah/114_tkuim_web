import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import { authMiddleware } from './middleware/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

await connectDB();

app.use('/auth', authRoutes);

app.get('/api/me', authMiddleware, (req, res) => {
  res.json(req.user);
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));