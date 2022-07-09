const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,

    },
    starttime: {
        type: String,

    },
    endtime: {
        type: String,

    },
    photo: {
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    invitedUsers: [{
        type: ObjectId,
        ref: "User"
    }],
    created: {
        type: Date,
        default: Date.now
    },

    longitude: { type: Number },

    latitude: { type: Number },

    category: { type: String },

    updated: Date,

});

module.exports = mongoose.model("Event", eventSchema);