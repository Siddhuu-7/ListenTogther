const mongoose=require('mongoose')
const Schema = new mongoose.Schema({
    FolderName: {
      type: String,
      unique:true,
      unique: true,
      trim: true
    },
    createdTime: {
      type: Date,
      default: Date.now
    }
  });
const Model=mongoose.model('Folders',Schema)
module.exports=Model