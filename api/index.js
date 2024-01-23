import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()
const app = express()

mongoose.connect(process.env.MONGO)
    .then(() => console.log('Connected!'));

app.listen(1000, () => {
    console.log("Server is running on port 1000")
})