const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const app = express();
const courses = require("./routes/courses");
const customers = require("./routes/customers");
const users = require("./routes/user");

app.use(express.json());
app.use("/api/courses", courses);
app.use("/api/customers", customers);
app.use("/api/users", users);

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
