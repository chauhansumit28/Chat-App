const User = require("../models/userModel"); // Change 'user' to 'User' to avoid conflict
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        // Check if all fields are provided
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if the username already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Profile photo based on gender
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        // const profilePhoto = gender === "male" ? maleProfilePhoto : femaleProfilePhoto;

        // Create the new user
        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input fields
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            });
        }

        // Compare provided password with hashed password in DB
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            });
        }

        // Generate JWT token
        const tokenData = {
            userId: user._id
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        // Set token in cookie
        res.cookie('token', token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            sameSite: 'Strict' // Prevents CSRF
        });

        // Send response with user details and token
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto,
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

const logout = (req,res) => {
    try {
        return res.status(200).cookie("token", "" ,{maxAge:0}).json({
            message:"Logout successfully..."
        })
    } catch (error) {
        console.log(error);
        
    }
}


const getotherusers = async (req,res)=>{
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    register,
    login,
    logout,
    getotherusers
};
