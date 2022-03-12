import express, { json } from "express";
import { config } from 'dotenv';
import connectDB from "./db.js";
import authRoutes from "./routes/authroutes";
import studentroutes from "./routes/studentroutes";
import universityroutes from "./routes/universityroutes";
import courseroutes from "./routes/courseroutes";
import { notFound } from "./middleware/error-handler.js";
const cors=require('cors');
import "core-js/stable";
import "regenerator-runtime/runtime";

const app = express();
config();
connectDB();
app.use(json());
app.use(cors());

//add routes for Authentication and for student CRUD operations
app.use('/api/user', authRoutes);
app.use('/api/student', studentroutes);
app.use('/api/uni', universityroutes);
app.use('/api/course', courseroutes);
app.use('', notFound);
export default app;