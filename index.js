const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
app.use(express.json());
app.use('/api/courses',courses);

mongoose.connect('mongodb://localhost/playground',{useNewUrlParser: true,useUnifiedTopology:true})
 .then(()=>console.log("Connected To MongoDb....."))
 .catch(err => console.log("Error",err));


const port = process.env.PORT || 3000
app.listen(port,()=>console.log(`Listening to port ${port}....`));