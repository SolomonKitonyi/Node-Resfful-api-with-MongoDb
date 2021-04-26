const mongoose = require("mongoose");

module.exports = function () {
	mongoose
		.connect("mongodb://localhost/playground", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.then(() => console.log("Connected To MongoDb....."))
		.catch((err) => console.log("Error", err));
};
