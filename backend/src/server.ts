import express from "express"
import dotenv from "dotenv"
import morgan from 'morgan';
import cors from 'cors';
import connectionDB from "./db/ConnectionDB";
import adminRouter from "./routes/admin.routes"; 
import authRouter from "./routes/auth.routes";
import globalErrorHandler from "./utils/globalerror";

dotenv.config({path : './.env'})

const app = express();


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('dev'));
app.use(cors({
    origin: true,
    credentials: true,
}));
app.options(/.*/, cors({
    origin: true,
    credentials: true,
}));


connectionDB()


app.use("/api/v1/admin", adminRouter); 
app.use("/api/v1/auth", authRouter);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})