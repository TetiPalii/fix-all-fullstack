import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors'
import router from "./routes/auth.js";

const app = express();
dotenv.config()

//constants
const PORT = process.env.PORT;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const NAME = process.env.DB_NAME;

//Middleware
app.use(cors());
app.use(express.json());

//Routes
//http://localhost:5000
app.use('/api/auth', router)

async function start(){
try {
    await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.q4snajz.mongodb.net/${NAME}?retryWrites=true&w=majority`)
    app.listen(PORT,()=>{console.log(`Server started at port ${PORT}`)})
} catch (error) {
    console.log(error)
}
}
start()