require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const error = require("./middleware/error");
const config = require("config");
const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const app = express();
const courses = require("./routes/courses");
const customers = require("./routes/customers");
const users = require("./routes/user");
const auth = require("./routes/auth");
const { transports } = require("winston");

app.use(express.json());
app.use("/api/courses", courses);
app.use("/api/customers", customers);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

process.on("uncaughtException", (ex) => {
	winston.error(ex.message, ex);
	process.exit(1);
});

process.on("unhandledRejection", (ex) => {
	winston.error(ex.message, ex);
	process.exit(1);
});

//winston.add(winston.transports.File, { filename: "logfile.log" });
const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	defaultMeta: { service: "user-service" },
	transports: [new winston.transports.File({ filename: "error.log" })],
});

winston.add(
	new winston.transports.MongoDB({
		db: "mongodb://localhost/playground",
		poolSize: 2,
		autoReconnect: true,
		useNewUrlParser: true,
		level: "error",
	})
);

if (!config.get("jwtPrivateKey")) {
	console.error("FATAL ERROR: jwtPrivateKey not defined");
	process.exit(1);
}

mongoose
	.connect("mongodb://localhost/playground", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log("Connected To MongoDb....."))
	.catch((err) => console.log("Error", err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}....`));
