const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const  mongoose  = require('mongoose');

const Course = mongoose.model('Course',new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength:4,
        maxlength:25
    }
}));

function validateCourse(course){
    const schema = Joi.object({
        name:Joi.string().min(3).required()
    })
    return schema.validate(course)
};

exports.Course = Course;
exports.validate = validateCourse;