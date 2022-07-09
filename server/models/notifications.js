const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const notificationsSchema = new mongoose.Schema({

    userRef: {
        type: ObjectId,
        ref: "User"
    },
    postLike: [{
        post: { type: ObjectId, ref: "Post" },
        created: { type: Date, default: Date.now },
        liker: { type: ObjectId, ref: "User" },
        VuPostLike: { type: Boolean , default: false}
    }],

    postComment: [{
        post: { type: ObjectId, ref: "Post" },
        created: { type: Date, default: Date.now },
        commentor: { type: ObjectId, ref: "User" },
        VuPostComment: { type: Boolean , default: false}
    }],

    eventPart: [{
        event: { type: ObjectId, ref: "Event" },
        created: { type: Date, default: Date.now },
        participant: { type: ObjectId, ref: "User" },
        VuEventPart: { type: Boolean , default: false}
    }],

    friendReq: [{
        friendrequester: { type: ObjectId, ref: "User" },
        created: { type: Date, default: Date.now },
        VuFriendReq: { type: Boolean , default: false}
    }],

    friendAccept: [{
        friendaccepter: { type: ObjectId, ref: "User" },
        created: { type: Date, default: Date.now },
        VuFriendAcc: { type: Boolean , default: false}
    }],

    heartReq: [{
        post: { type: ObjectId, ref: "Post" },
        heartrequester: { type: ObjectId, ref: "User" },
        created: { type: Date, default: Date.now },
        VuHeartReq: { type: Boolean , default: false}
    }],

    heartAccept: [{
        post: { type: ObjectId, ref: "Post" },
        heartaccepter: { type: ObjectId, ref: "User" },
        created: { type: Date, default: Date.now },
        VuHeartAcc: { type: Boolean , default: false}
    }],

    jumlageReq: [{
        jumlagerequester: { type: ObjectId, ref: "User" },
        created: { type: Date, default: Date.now },
        VuJumlageReq: { type: Boolean , default: false}
    }],

    jumlageAccept: [{
        jumlageaccepter: { type: ObjectId, ref: "User" },
        created: { type: Date, default: Date.now },
        VuJumlageAcc: { type: Boolean , default: false}
    }],

    AcceToMedia: [{
        AcceMedia: { type: ObjectId, ref: "User" },
        created: { type: Date, default: Date.now },
        VuAcceMed: { type: Boolean , default: false}
    }],

    eventInv: [{
        event: { type: ObjectId, ref: "Event" },
        created: { type: Date, default: Date.now },
        inviter: { type: ObjectId, ref: "User" },
        VuEventInv: { type: Boolean , default: false}
    }],

    badge: {type: Number , default: 0}


});

module.exports = mongoose.model("Notifs", notificationsSchema);