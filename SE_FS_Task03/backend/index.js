import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./.utils/db.js";
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js'
import path from 'path';


dotenv.config({})
const app = express();

// middle wires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
    // origin: "https://careerhunt-6vwp.onrender.com",
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOption))

const _dirname = path.resolve();

app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicationRoute);

// app.use(express.static(path.join(_dirname, '/frontend/dist')));
// app.get('*', (_, res) => {
//     res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
// })

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})