const express = require('express');
const { Teacher } = require('../model/teacher.model');


const teacherRoute = express.Router();

teacherRoute.post('/',async(req,res)=>{
    const data = req.body;
    try{
        let addDetails = new Teacher(data);
        await addDetails.save();
        res.send(addDetails);
    }catch(err){
        res.status(500).send({
            'msg':'Something went Wrong!'
        })
    }
})




module.exports = {teacherRoute};