const { User, validate } = require("../models/user");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send("User already Registered");

	user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});

	await user.save();

	res.send({
		name: user.name,
		password: user.password,
	});
});

module.exports = router;
