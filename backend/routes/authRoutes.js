const express = require("express");
const { Logout, LoginUser, RegisterUser, checkSession } = require("../controllers/authController");

const router = express.Router();

// Register
router.post("/register", RegisterUser);

// Login
router.post("/login", LoginUser);

// Check active session
router.get("/check-session", checkSession);
// Logout
router.post("/logout", Logout);

module.exports = router;
