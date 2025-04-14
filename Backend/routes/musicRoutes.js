const express = require('express');
const ImageKit = require('imagekit');
const router=express.Router()
const Model=require('../Models/TemperoryFiles.model')
const FolderModel=require('../Models/folders');
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
// router.post('/tmpMusicData', async (req, res) => {
//     const { id ,roomId} = req.body;

//     if (!id) {
//         return res.status(400).json({ msg: "Missing 'id' in request body" });
//     }

//     try {
//         const model = new Model({ id ,roomId}); 
//         await model.save();
//         res.status(201).json({ msg: "Saved successfully" });
        
//     } catch (err) {
//         // console.error(err);
//         res.status(500).json({ msg: err.message });
//     }
// });
router.get('/getFolders',async(req,res)=>{
 try {
    const folder=await FolderModel.find()
    if(!folder) return
   
    res.status(201).json(folder)

 } catch (error) {
    res.status(505).json({msg:error.message})
 }
})
router.get('/getTmpMusic', async (req, res) => {
  const { folder } = req.query;

  if (!folder) {
    return res.status(400).json({ msg: "Missing 'folder' query parameter" });
  }

  try {
    const result = await imagekit.listFiles({ path: `/tmpFolder/${folder}` });
    res.status(200).json({ data: result });
  } catch (error) {
    console.error("ImageKit fetch error:", error?.message || error);
    res.status(500).json({ msg: "Failed to fetch files", error });
  }
});

// router.delete('/deleteTmpData',async (req,res) => {
//     const {bool,roomId}=req.body;
//     try {
//         if(!bool){
//             return res.status(505).json({msg:"stilii using"})
//         }
//         if(bool){
//            var data=await Model.find({roomId:roomId},{id:1,_id:0})
//         }
        
//       await Promise.all(
//        data.forEach(async(fieldId)=>await imagekit.deleteFile(fieldId))
//       )        
//         await Model.deleteMany({roomId:roomId})
//         res.status(201).json({msg:"Deleted successFully"})

//     } catch (error) {
        
//         res.status(505).json({msg:error.message})
//     }
// })
router.post('/deletefolder',async (req,res) => {
    const {FolderName}=req.body;
    try {
            await imagekit.deleteFolder(FolderName)
            await FolderModel.deleteOne({FolderName})
        
        res.status(201).json({msg:"deleted successfully"})
    } catch (error) {
        res.status(505).json({msg:error.message})
    }
})
router.post('/folderSave', async (req, res) => {
    const { FolderName } = req.body;
  
    try {
      const data = new FolderModel({ FolderName });
      await data.save();
      res.status(201).json({ msg: "Saved " + FolderName });
    } catch (error) {
      if (error.code === 11000) {
        
        return res.status(409).json({ msg: `Folder "${FolderName}" already exists.` });
      }
  
      res.status(500).json({ msg: error.message });
    }
  });
  
module.exports=router