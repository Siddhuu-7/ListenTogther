const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    roomId:String,
    username:String,
    review:String,
    rating:String

})
const Model=mongoose.model('review',Schema)
module.exports=Model