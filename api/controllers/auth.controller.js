// import User from '../models/user.js';
// import bcrypt from 'bcrypt';

// export const signup = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 12);

//         // Create a new user
//         const newUser = new User({ name, email, password: hashedPassword });

//         // Save the user to the database
//         await newUser.save();

//         // Respond with success message
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const {password: pass , ...data} = existingUser._doc;
        // Respond with success message and token
        res.cookie('token', token, { httpOnly: true });
        // res.status(200).json(data);
        res.status(200).json({data });
        
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

export const google = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const {password: pass , ...data} = user._doc;
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({data});
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);
            const newUser = new User ({username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8), email: req.body.email, password: hashedPassword, avatar: req.body.photo});
            await newUser.save();
            const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
           const {password: pass , ...data} = newUser._doc;
            res.cookie('token', token, { httpOnly: true });
            
            res.status(200).json({data});
        }
    }catch(error){
        next(error);
    }
}
