const { User, validate } = require("../models/user");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/", async (req, res) => {
	const users = await User.find().sort("name");
	res.send(users);
});

module.exports = router;
