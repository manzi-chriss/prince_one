const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User } = require('../../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
            { _id: user._id, username: user.username, email: user.email },
            process.env.SECRET,
            { expiresIn: '1h' } // Optional: set token expiration
        );

        return res.status(200).json({ message: "Successful login", user, token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
