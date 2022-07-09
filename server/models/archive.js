const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const archiveSchema = new mongoose.Schema({
   
    photo: {
        data: Buffer,
        contentType: String
    
    },
    views: [{type: ObjectId, ref: "User"}],
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now,
        ref: "Story"
    },
    updated: Date,
   
});

module.exports = mongoose.model("Archive", archiveSchema);