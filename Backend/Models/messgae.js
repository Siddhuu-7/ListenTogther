const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    roomId:String,
    senderId:String,
    message:String,
    username:String,
    timestamp: {
        type: Date,
        default: Date.now
      }

})
const Model=mongoose.model('message',Schema)
module.exports=Model