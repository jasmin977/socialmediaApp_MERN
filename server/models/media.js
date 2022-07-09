const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const mediaSchema = new mongoose.Schema({


    postRef: {
        type: ObjectId,
        ref: "Post"
    },

    photo: {
        data: Buffer,
        contentType: String
    },

    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,

});

module.exports = mongoose.model("Media", mediaSchema);