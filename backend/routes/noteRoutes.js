const express = require("express");
const Note = require("../models/Note");
const { Add, Update, Delete } = require("../controllers/noteController");

const router = express.Router();

// Create a note
router.post("/add", Add)

// Update a note
router.put("/update/:id", Update)

// Delete a note
router.delete("/delete/:id", Delete)

module.exports = router;
