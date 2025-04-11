const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    id:String,
    roomId:String
})
const Model=mongoose.model('TMPlisten',Schema)
module.exports=Model