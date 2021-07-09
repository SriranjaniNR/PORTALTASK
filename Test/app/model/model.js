var mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true,
     
      unique: true,
    },
    password:{
      type:String,
      required:true
    },
    intro:{
      type:String,
      required:true
    }

})
module.exports = mongoose.model("logs",userSchema)
