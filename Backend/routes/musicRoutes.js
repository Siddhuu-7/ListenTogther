const express = require('express');
const ImageKit = require('imagekit');
const router=express.Router()
const Model=require('../Models/TemperoryFiles.model')
require('dotenv').config()
const imagekit = new ImageKit({
    publicKey: process.env.PUBLICKEY,
    privateKey: process.env.PRAVITEKEY,
    urlEndpoint: process.env.URLENDPOINT
  });
  router.get('/musicData', async (req, res) => {
    try {
        const result = await imagekit.listFiles({ path: '/ListenTogether' });
        res.status(200).json({data: result });
    } catch (error) {
        // console.error("ImageKit error:", error);
        res.status(500).json({ msg: 'Failed to fetch files', error });
    }
});
router.post('/tmpMusicData', async (req, res) => {
    const { id ,roomId} = req.body;

    if (!id) {
        return res.status(400).json({ msg: "Missing 'id' in request body" });
    }

    try {
        const model = new Model({ id ,roomId}); 
        await model.save();
        res.status(201).json({ msg: "Saved successfully" });
        
    } catch (err) {
        // console.error(err);
        res.status(500).json({ msg: err.message });
    }
});
router.get('/getTmpMusic',async(req,res)=>{
    const{roomId}=req.query
    console.log(roomId)
    try {
        const result = await imagekit.listFiles({ path: '/TMPListenTogether'+roomId });
        res.status(200).json({data: result });
    } catch (error) {
        // console.error("ImageKit error:", error);
        res.status(500).json({ msg: 'Failed to fetch files', error });
    }
})
router.delete('/deleteTmpData',async (req,res) => {
    const {bool,roomId}=req.body;
    try {
        if(!bool){
            return res.status(505).json({msg:"stilii using"})
        }
        if(bool){
           var data=await Model.find({roomId:roomId},{id:1,_id:0})
        }
        // console.log(data)
      await Promise.all(
       data.forEach(async(fieldId)=>await imagekit.deleteFile(fieldId))
      )        
        await Model.deleteMany({roomId:roomId})
        res.status(201).json({msg:"Deleted successFully"})

    } catch (error) {
        // console.log(error.message)
        res.status(505).json({msg:error.message})
    }
})
module.exports=router