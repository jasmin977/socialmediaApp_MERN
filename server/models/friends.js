const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const friendsSchema = new mongoose.Schema({

    userRef: {
        type: ObjectId,
        ref: "User"
    },
    friends: [{
		type: ObjectId,
        ref: "User"
	}],
    outGoingReq: [{
        type: ObjectId,
        ref: "User"
    }],
    inCommingReq: [{
        type: ObjectId,
        ref: "User"
    }],
    blocked: [{
		type: ObjectId,
        ref: "User"
	}], 
});

module.exports = mongoose.model("Friends", friendsSchema);