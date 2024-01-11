import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

const app = express();
dotenv.config()
const PORT = process.env.PORT;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const NAME = process.env.DB_NAME;

async function start(){
try {
    await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.q4snajz.mongodb.net/${NAME}?retryWrites=true&w=majority`)
    app.listen(5000,()=>{console.log(`Server started at port ${PORT}`)})
} catch (error) {
    console.log(error)
}
}
start()