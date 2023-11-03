const express = require('express');
const router = express.Router();

router.post("/register", (req, res) => {
    res.status(200).json({message: "Admin registration"});
});

router.post("/login", (req, res) => {
    res.status(200).json({message: "Admin Login"});
});

router.get("/current", (req, res) => {
    res.status(200).json({message: "Current Admin"});
});

module.exports = router;