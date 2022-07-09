const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const jumlageSchema = new mongoose.Schema({

    userRef: {
        type: ObjectId,
        ref: "User"
    },
    
    player2 : {
		type: ObjectId,
        ref: "User"
	},

    status : { type : Boolean, default : false } ,
    
    outGoingReq: [{
        type: ObjectId,
        ref: "User"
    }],
    inCommingReq: [{
        type: ObjectId,
        ref: "User"
    }],
    
});

module.exports = mongoose.model("Jumlage", jumlageSchema);