const express = require('express');
const Joi = require('joi');
const  mongoose  = require('mongoose');
const router = express.Router();

const Course = mongoose.model('Course',new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength:4,
        maxlength:25
    }
}));

// router.get('/',(req,res)=>{
//     res.send('Hello World!!!!!');
// });
router.get('/',async(req,res)=>{
    const courses = await Course.find().sort('name');
    res.send(courses);
});


router.get('/:id',async (req,res)=>{
     const course = await Course.findById(req.params.id)
    if(!course) res.status(404).send("The course you are trying to search was not found");
    res.send(course);
});


router.post('/',async(req,res)=>{
    const {error} = validateCourse(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    let course = new Course ({ name: req.body.name});
    course = await course.save(course);
    res.send(course);
});


router.put('/:id',async(req,res)=>{
    const {error} = validateCourse(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    const course = await Course.findByIdAndUpdate(req.params.id,{name:req.body.name},{
       new:true
    });
    if(!course) return res.status(404).send("The course you are trying to search was not found");
   
    res.send(course);
});

router.delete('/:id',async(req,res)=>{
    const course = await Course.findByIdAndRemove(req.params.id);
    if(!course) return res.status(404).send("The course you are trying to search was not found");
    res.send(course);
});


function validateCourse(course){
    const schema = Joi.object({
        name:Joi.string().min(3).required()
    })
    return schema.validate(course)
}
module.exports = router;