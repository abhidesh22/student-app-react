import express, { json } from "express";
import { config } from 'dotenv';
import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes";
import articleRoutes from "./routes/articleRoutes";
import studentRoutes from "./routes/studentRoutes";
import universityRoutes from "./routes/universityRoutes";

const app = express();
config();
connectDB();
app.use(json());

const PORT = process.env.PORT || 5000;

//add routes for Authentication and for article CRUD operations
app.use('/api/user', authRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/uni', universityRoutes);
app.listen(PORT, console.log(`server started on port ${PORT}`));