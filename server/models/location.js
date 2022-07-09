const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const locationSchema = new mongoose.Schema({
   
   userRef: {type: ObjectId, ref: "User"} ,

   long : { type : Number , default: "0" } ,

   alt : { type : Number , default: "0" } ,

   perm : { type : Boolean , default : true }

    
});

module.exports = mongoose.model("Location", locationSchema);