const User = require("./../models/signupmodels");

// Signup
const signupUser = async(req, res) => {
    try{
        const {firstname, lastname, email, phone, password} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email"
            });
        }

        const newUser = new User({
            firstname,
            lastname,
            email,
            phone,
            password,
        });
        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User signed up successfully",
            data: { firstname: savedUser.firstname, email: savedUser.email }
        });
    } catch(error){
        res.status(500).json({
            message: "Error during registration",
            error: error.message,
        });
    }
};

// Login
const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        res.status(200).json({
            message: "Login successful",
            data: { firstname: user.firstname, email: user.email }
        });
    } catch(error){
        res.status(500).json({
            message: "Error during login",
            error: error.message,
        });
    }
};

// Forgot Password
const forgotPassword = async(req, res) => {
    try{
        const {email, newPassword} = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            message: "Password updated successfully"
        });
    } catch(error){
        res.status(500).json({
            message: "Error updating password",
            error: error.message,
        });
    }
};

module.exports = {
    signupUser,
    loginUser,
    forgotPassword
};   