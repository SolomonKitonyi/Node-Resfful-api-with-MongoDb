const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
	const { transports } = require("winston");

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
};
