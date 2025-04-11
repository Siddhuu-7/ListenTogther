const mongoose=require('mongoose')
require('dotenv').config()
module.exports=()=>{

mongoose.connect(process.env.MONGO_DB_URL+"ListenTogther").then(()=>{
    console.log('Connectd')
})
.catch(err=>{
    console.log(err)
})
}

