const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const participantsSchema = new mongoose.Schema({
   
   refevent: {type: ObjectId, ref: "Event"},

    parts: [{type: ObjectId, ref: "User"}]
    
});

module.exports = mongoose.model("Participants", participantsSchema);