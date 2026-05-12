import express from "express"
import dotenv from "dotenv"
import morgan from 'morgan';
import connectionDB from "./db/ConnectionDB";
import adminRouter from "./routes/admin.routes"; 
import globalErrorHandler from "./utils/globalerror";

dotenv.config({path : './.env'})

const app = express();


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('dev'));


connectionDB()


app.use("/api/v1/admin", adminRouter); 

app.use(globalErrorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})