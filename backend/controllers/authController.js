const User = require("../models/User");
const express = require("express");
const bcrypt = require("bcryptjs");

const RegisterUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user already exists
        const dbuser = await User.findOne({ username });
        if (dbuser) {
            return res.status(409).json({ message: "User is already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({newUser, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const LoginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user in DB
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Store user in session
        req.session.user = { id: user._id, username: user.username };
        

        res.json({ message: "Login successful", user: req.session.user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const Logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("user_session"); // Clear session cookie
        res.json({ message: "Logged out successfully" });
    });
};

// Middleware to check session
const checkSession = (req, res) => {
    if (req.session.user) {
        return res.json({ user: req.session.user });
    }
    return res.status(401).json({ message: "No active session" });
};

module.exports = { LoginUser, RegisterUser, Logout, checkSession };
