const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({

    body: {
        type: String,
        required: true
    },

    mediaRef: [{
        type: ObjectId,
        ref: "Media"
    }],

    privacy: { type: Boolean, default: false },
    authorized: [{ type: ObjectId, ref: "User" }],
    requested: [{ type: ObjectId, ref: "User" }],

    visible: { type: Boolean, default: true },

    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    tags: [{
        type: String,
    }],

    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [{
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: ObjectId, ref: "User" }
    }]
});

module.exports = mongoose.model("Post", postSchema);