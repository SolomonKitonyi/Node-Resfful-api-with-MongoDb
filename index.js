const Joi = require('joi');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
app.use(express.json());
app.use('/api/courses',courses);


const port = process.env.PORT || 3000
app.listen(port,()=>console.log(`Listening to port ${port}....`));