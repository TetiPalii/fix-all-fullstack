import User from '../models/User.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Register
export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const isUsed = await User.findOne({ username });

        if (isUsed) {
            return res.json({ message: 'The username is already used' })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash,
        })

        //save user n base
        await newUser.save();
        res.json({
            newUser,
            message: 'The user has been registered succesfully!'
        })
    } catch (error) {
        res.json({
            message: 'Error has occured'
        })
    }
};


//Login
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.json({
                message: "There is no user with such name!"
            });
        };

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({
                message: 'Wrong email or password, please try again!',
            })
        };
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: '30d' })
        res.json({
            token, user, message: 'You logged in succesfully'
        })
        
    } catch (error) {
        res.json({ message: 'Wrong email or password, please try again!' })
        
    }
};

//Get me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.json({
                message: "There is no user with such name!"
            });
        };
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({
            token,
            user,
        })


    } catch (error) {
        
        res.json({message:'Forbiden'})
    }
}