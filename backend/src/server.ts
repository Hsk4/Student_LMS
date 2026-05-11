import express from "express"
import dotenv from "dotenv"
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectionDB from "./db/ConnectionDB";


dotenv.config({path : './.env'})

const app = express();

app.use(morgan('dev'));

connectionDB()


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})