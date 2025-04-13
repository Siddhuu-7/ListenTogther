const express=require('express');
const Router=express.Router()
const reviewModel=require('../Models/review.model')
Router.post('/postUserDeatils',async (req,res) => {
    const {roomId,username,review,rating}=req.body;
    try {
        const data=await new reviewModel({
            roomId,
            username,
            review,
            rating
        })
        await data.save()
        res.status(201).json({msg:"saved in db"})
    } catch (error) {
        res.status.json({msg:error.message})
    }
})
Router.get('/getUserDeatils',async (req,res) => {
    try {
        const data=await reviewModel.find()
        res.status(201).json(data)
    } catch (error) {
        res.status(505).json(error.message)
    }
})
module.exports=Router