const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_DB_URL+"temporaryListenTogether").then(()=>{
    console.log('Connectd')
})
.catch(err=>{
    console.log(err)
})
const Schema=new mongoose.Schema({
    id:String,
    roomId:String
})
const Model=mongoose.model('TMPlisten',Schema)
module.exports=Model