const express = require("express");
const courses = require("../routes/courses");
const customers = require("../routes/customers");
const users = require("../routes/user");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
	app.use(express.json());
	app.use("/api/courses", courses);
	app.use("/api/customers", customers);
	app.use("/api/users", users);
	app.use("/api/auth", auth);

	app.use(error);
};
