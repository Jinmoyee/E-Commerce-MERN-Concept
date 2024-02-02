import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js'
import { errorHandeler } from '../utils/error.js';


export const test = (req, res) => {
    res.send("User API Testing only")
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandeler(403, "You can update only your account!"))
    }
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true })
        const { password, ...others } = updateUser._doc
        res.status(200).json(others)
    } catch (error) {
        next(error)
    }
}