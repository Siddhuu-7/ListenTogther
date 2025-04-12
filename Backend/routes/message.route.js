const express = require('express');
const messageModel =require('../Models/messgae')
const router=express.Router()
router.get('/getMessages',async(req,res)=>{
    const{roomId}=req.query
    try {
        const data=await messageModel.find({roomId})
        res.status(201).json(data)
    } catch (error) {
        res.status(505).json({msg:error.message})
    }
})
module.exports=router