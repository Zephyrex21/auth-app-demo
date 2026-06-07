import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(express.static('public'));   // ← serves your frontend from the public/ folder

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;   // FIX: fallback so server always starts on a real port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
