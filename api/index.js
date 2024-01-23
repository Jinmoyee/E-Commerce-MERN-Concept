import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config()
const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO)
    .then(() => console.log('Connected!'));

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/api/user', userRouter)

app.use('/api/auth', authRouter)


app.listen(1000, () => {
    console.log("Server is running on port 1000")
})