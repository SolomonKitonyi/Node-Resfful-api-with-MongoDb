const express = require('express');
const Joi = require('joi');
const  mongoose  = require('mongoose');
const router = express.Router();

const Customer = mongoose.model('Customer',new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength:4,
        maxlength:25
    },
    isGold:{
        type:Boolean,
        default: false
    },
    phone:{
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
    const customers = await Customer.find().sort('name');
    res.send(customers);
});


router.get('/:id',async (req,res)=>{
     const customer = await Customer.findById(req.params.id)
    if(!customer) res.status(404).send("The customer you are trying to search was not found");
    res.send(customer);
});


router.post('/',async(req,res)=>{
    const {error} = validateCustomer(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    let customer = new Customer ({
         name: req.body.name,
         phone:req.body.phone,
         isGold:req.body.isGold
    });
    customer = await customer.save(customer);
    res.send(customer);
});

router.put('/:id',async(req,res)=>{
    const {error} = validateCustomer(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id,{name:req.body.name,phone:req.body.phone,isGold:req.body.isGold},{
       new:true
    });
    if(!customer) return res.status(404).send("The customer you are trying to search was not found");
   
    res.send(customer);
});

router.delete('/:id',async(req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send("The customer you are trying to search was not found");
    res.send(customer);
});


function validateCustomer(customer){
    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
        phone:Joi.string().min(5).max(50).required(),
        isGold:Joi.boolean()
    });
    return schema.validate(customer)
}

module.exports = router;