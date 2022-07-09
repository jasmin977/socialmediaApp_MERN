const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const albumSchema = new mongoose.Schema({

    userRef: { type: ObjectId, ref: "User" },

    private: [{ type: ObjectId, ref: "Post" }],

    public: [{ type: ObjectId, ref: "Post" }],

    authorized: [{ type: ObjectId, ref: "User" }],

    authorizedone: [{
        expire_at: { type: Date, default: Date.now, expires: 86400 },
        authorized: { type: ObjectId, ref: "User", },
        
    }],
    authorizedtwo: [{
        authorized: { type: ObjectId, ref: "User", },
        expire_at: { type: Date, default: Date.now, expires: 172800 },
        
    }],



});

module.exports = mongoose.model("Album", albumSchema);