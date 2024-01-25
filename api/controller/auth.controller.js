import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { errorHandeler } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    const hashPassword = bcrypt.hashSync(password, 12)
    const newUser = new User({ username, email, password: hashPassword })
    try {
        await newUser.save()
        res.status(201).json("User created successfully")
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandeler(404, "User email not found!"))
        }
        const validPassword = bcrypt.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandeler(401, "Wrong Credentials!"))
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error)
    }
}