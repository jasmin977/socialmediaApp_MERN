const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');

const User = require('../models/user');
const Friends = require('../models/friends');
const Notifs = require('../models/notifications');
const Jumlage = require('../models/jumlage');
const Album = require('../models/album');
const Location = require('../models/location');


exports.userById = (req, res, next, id) => {
    User.findById(id)
        //.populate('following','_id name')
        //.populate('followers','_id name')
        //.select('username email phoneNumber created about status')
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            // add profile object in request with user info
            req.profile = user;
            next();
        });
};

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && (req.profile._id === req.auth._id);
    if (!authorized) {
        return res.status(403).json({
            error: "user is not authorized to perform this action"
        });
    }
};

exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        return res.json(users);
    })


};

exports.allNotifs = (req, res) => {
    Notifs.find((err, notifs) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        return res.json(notifs);
    })


};

exports.oneNotif = (req, res) => {
    Notifs.find({ userRef: req.body.userId })
        .populate('postLike.liker', 'username')
        .populate('postComment.commentor', 'username')
        .populate('eventPart.participant', 'username')
        .populate('friendReq.friendrequester', 'username')
        .populate('friendAccept.friendaccepter', 'username')
        .populate('heartReq.heartrequester', 'username')
        .populate('heartAccept.heartaccepter', 'username')
        .populate('jumlageReq.jumlagerequester', 'username')
        .populate('jumlageAccept.jumlageaccepter', 'username')
        .select('_id postLike postComment eventPart')

        .exec((err, notifs) => {
            if (err || !notifs) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            return res.json(notifs);
        })

};

exports.allFriends = (req, res) => {
    Friends.find()

        .exec((err, friends) => {
            if (err || !friends) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            return res.json(friends);
        })

};

exports.oneFriends = (req, res) => {
    Friends.find({ userRef: req.body.userId })
        .populate('friends', '_id username')
        .populate('outGoingReq', '_id username')
        .populate('inCommingReq', '_id username')
        .populate('blocked', '_id username')
        .exec((err, friends) => {
            if (err || !friends) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            return res.json(friends);
        })

};

exports.allJumlages = (req, res) => {
    Jumlage.find()

        .exec((err, jumlages) => {
            if (err || !jumlages) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            return res.json(jumlages);
        })
};

exports.allLocations = (req, res) => {
    Location.find()

        .exec((err, location) => {
            if (err || !location) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            return res.json(location);
        })
};

exports.oneJumlages = (req, res) => {
    Jumlage.find({ userRef: req.body.userId })
        .populate('player2', '_id username')
        .populate('outGoingReq', '_id username')
        .populate('inCommingReq', '_id username')
        .exec((err, jumlages) => {
            if (err || !jumlages) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            return res.json(jumlages);
        })
};

exports.allalbums = (req, res) => {
    Album.find()



        .exec((err, albums) => {
            if (err || !albums) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            return res.json(albums);
        })
};

exports.onealbums = (req, res) => {
    Album.find({ userRef: req.body.userId })
        .populate('private', 'photo title body created private  ')
        .populate('private.postedBy', 'username')
        .populate('private.likes', 'username')
        .populate('private.comments.postedBy', 'username text')

        .populate('public', 'photo title body created private  ')
        .populate('public.postedBy', 'username')
        .populate('public.likes', 'username')
        .populate('public.comments.postedBy', 'username text')


        .exec((err, albums) => {
            if (err || !albums) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            return res.json(albums);
        })
};

exports.getUser = (req, res) => {
    // set hashed_password and salt undefined since we dont want it in response while viewing single user
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }
        //save user
        let user = req.profile;
        user = _.extend(user, fields);
        user.updated = Date.now();

        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }
        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        });
    });
};

exports.updateUserRn = (req, res) => {
    let user = req.profile;
    console.log(req.body);
    user = _.extend(user, req.body);

    user.updated = Date.now();
    user.complete = true;

    if (req.body.base64Data && req.body.imageType) {
        user.photo.data = Buffer.from(req.body.base64Data, 'base64');
        user.photo.contentType = req.body.imageType;
    }

    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.editUser = (req, res, next) => {
    let user = req.profile;
    console.log(req.body);
    user = _.extend(user, req.body);
    user.updated = Date.now();

    const allowedFields = { email: req.body.email, phoneNumber: req.body.phoneNumber, username: req.body.username };

    // Override the current user data with new one
    user = Object.assign(user, allowedFields);

    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.userPhoto = (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
        if (err || !user) {
            res.status(400).json({
                error: err
            })
        }
        if (user.photo.data) {
            res.set("Content-Type", user.photo.contentType);
            return res.send(user.photo.data);
        }
        next();
    })
};

exports.deleteUser = (req, res, next) => {

    let user = req.profile;

    if (!user) {
        return res.status(400).json({
            error: "User with that username does not exist. Please signup. "
        });
    }

    if (!user.authenticate(req.body.password)) {
        return res.status(400).json({
            err: "password is incorrect. try again"
        });
    }

    Friends.findOneAndDelete({ userRef: user._id }, function (err, docs) {
        if (err) {
            console.log(err)
        }

    });

    Notifs.findOneAndDelete({ userRef: user._id }, function (err, docs) {
        if (err) {
            console.log(err)
        }

    });

    Jumlage.findOneAndDelete({ userRef: user._id }, function (err, docs) {
        if (err) {
            console.log(err)
        }

    });

    Album.findOneAndDelete({ userRef: user._id }, function (err, docs) {
        if (err) {
            console.log(err)
        }

    });

    Location.findOneAndDelete({ userRef: user._id }, function (err, docs) {
        if (err) {
            console.log(err)
        }

    });


    user.remove((err, user) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
    });

    res.clearCookie("t")
    return res.status(200).json({ message: "Account has been deleted." })

};

exports.addFriend = async (req, res) => {

    const juice = { friendaccepter: req.body.userId };

    Notifs.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { friendAccept: juice }, $inc: { badge: 1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    User.findOneAndUpdate({ _id: req.body.friendId }, { $addToSet: { friends: req.body.userId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { friends: req.body.friendId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Friends.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { friends: req.body.userId }, $pull: { outGoingReq: req.body.userId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Friends.findOneAndUpdate({ userRef: req.body.userId }, { $addToSet: { friends: req.body.friendId }, $pull: { inCommingReq: req.body.friendId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
};

exports.VuFriendAcc = async (req, res) => {

    Notifs.findOneAndUpdate({ 'friendAccept._id': req.body.notifId }, { $set: { 'friendAccept.$.VuFriendAcc': true } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Notifs.findOneAndUpdate({ userRef: req.body.userId }, { $inc: { badge: -1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
};

exports.deleteFriend = async (req, res) => {

    User.findOneAndUpdate({ _id: req.body.userId }, { $pull: { friends: req.body.friendId } }, { new: true },)
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    User.findOneAndUpdate({ _id: req.body.friendId }, { $pull: { friends: req.body.userId } }, { new: true },)
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Friends.findOneAndUpdate({ userRef: req.body.friendId }, { $pull: { friends: req.body.userId } }, { new: true },)
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Friends.findOneAndUpdate({ userRef: req.body.userId }, { $pull: { friends: req.body.friendId } }, { new: true },)
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
};

exports.sendRequest = async (req, res) => {

    const juice = { friendrequester: req.body.userId };

    Notifs.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { friendReq: juice }, $inc: { badge: 1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });


    Friends.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { inCommingReq: req.body.userId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Friends.findOneAndUpdate({ userRef: req.body.userId }, { $addToSet: { outGoingReq: req.body.friendId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });


};

exports.VuFriendReq = async (req, res) => {

    Notifs.findOneAndUpdate({ 'friendReq._id': req.body.notifId }, { $set: { 'friendReq.$.VuFriendReq': true } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Notifs.findOneAndUpdate({ userRef: req.body.userId }, { $inc: { badge: -1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
};

exports.declineRequest = async (req, res) => {

    Friends.findOneAndUpdate({ userRef: req.body.friendId }, { $pull: { outGoingReq: req.body.userId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Friends.findOneAndUpdate({ userRef: req.body.userId }, { $pull: { inCommingReq: req.body.friendId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
};

exports.cancelRequest = async (req, res) => {

    Friends.findOneAndUpdate({ userRef: req.body.friendId }, { $pull: { inCommingReq: req.body.userId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Friends.findOneAndUpdate({ userRef: req.body.userId }, { $pull: { outGoingReq: req.body.friendId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });

};

exports.blockFriend = async (req, res) => {

    User.findOneAndUpdate({ _id: req.body.friendId }, { $pull: { friends: req.body.userId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    User.findOneAndUpdate({ _id: req.body.userId }, { $pull: { friends: req.body.friendId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Friends.findOneAndUpdate({ userRef: req.body.friendId }, { $pull: { friends: req.body.userId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Friends.findOneAndUpdate({ userRef: req.body.userId }, { $pull: { friends: req.body.friendId }, $addToSet: { blocked: req.body.friendId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });

};

exports.unblockFriend = (req, res) => {

    Friends.findOneAndUpdate({ userRef: req.body.userId }, { $pull: { blocked: req.body.friendId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });


};

exports.jumlagerequest = (req, res) => {

    const juice = { jumlagerequester: req.body.userId };

    Notifs.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { jumlageReq: juice }, $inc: { badge: 1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });


    Jumlage.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { inCommingReq: req.body.userId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Jumlage.findOneAndUpdate({ userRef: req.body.userId }, { $addToSet: { outGoingReq: req.body.friendId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });


};

exports.VuJumlageReq = async (req, res) => {

    Notifs.findOneAndUpdate({ 'jumlageReq._id': req.body.notifId }, { $set: { 'jumlageReq.$.VuJumlageReq': true } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Notifs.findOneAndUpdate({ userRef: req.body.userId }, { $inc: { badge: -1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
};

exports.jumlageaccept = async (req, res) => {

    const juice = { jumlageaccepter: req.body.userId };

    Notifs.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { jumlageAccept: juice }, $inc: { badge: 1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Jumlage.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { player2: req.body.userId }, $pull: { outGoingReq: req.body.userId }, $set: { status: true } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Jumlage.findOneAndUpdate({ userRef: req.body.userId }, { $addToSet: { player2: req.body.friendId }, $pull: { inCommingReq: req.body.friendId }, $set: { status: true } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });

};

exports.VuJumlageAcc = async (req, res) => {

    Notifs.findOneAndUpdate({ 'jumlageAccept._id': req.body.notifId }, { $set: { 'jumlageAccept.$.VuJumlageAcc': true } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Notifs.findOneAndUpdate({ userRef: req.body.userId }, { $inc: { badge: -1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
};

exports.canceljumlageRequest = async (req, res) => {

    Jumlage.findOneAndUpdate({ userRef: req.body.friendId }, { $pull: { inCommingReq: req.body.userId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Jumlage.findOneAndUpdate({ userRef: req.body.userId }, { $pull: { outGoingReq: req.body.friendId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });

};

exports.declinejumlageRequest = async (req, res) => {

    Jumlage.findOneAndUpdate({ userRef: req.body.friendId }, { $pull: { outGoingReq: req.body.userId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Jumlage.findOneAndUpdate({ userRef: req.body.userId }, { $pull: { inCommingReq: req.body.friendId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
};

exports.deletejumlage = async (req, res) => {

    Jumlage.findOneAndUpdate({ userRef: req.body.friendId }, { $pull: { player2: req.body.userId }, $set: { status: false } }, { new: true },)
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Jumlage.findOneAndUpdate({ userRef: req.body.userId }, { $pull: { player2: req.body.friendId }, $set: { status: false } }, { new: true },)
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });

};

exports.AccesMediaForever = async (req, res) => {

    const juice = {
        AcceMedia: req.body.userId,
    };

    Notifs.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { AcceToMedia: juice }, $inc: { badge: 1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Album.findOneAndUpdate({ userRef: req.body.userId }, { $addToSet: { authorized: req.body.friendId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
};

exports.AccesMediaOneDay = async (req, res) => {

    const juice = {
        AcceMedia: req.body.userId,

    };

    Notifs.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { AcceToMedia: juice }, $inc: { badge: 1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    const juic = {
        authorized: req.body.friendId,
    };
    Album.findOneAndUpdate({ userRef: req.body.userId }, { $addToSet: { authorizedone: juic } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
};

exports.AccesMediaTwoDay = async (req, res) => {

    const juice = {
        AcceMedia: req.body.userId,

    };

    Notifs.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { AcceToMedia: juice }, $inc: { badge: 1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    const juic = {
        authorized: req.body.friendId,
    };
    Album.findOneAndUpdate({ userRef: req.body.userId }, { $addToSet: { authorizedtwo: juic } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
};

exports.VuAccesMedia = async (req, res) => {

    Notifs.findOneAndUpdate({ 'AcceToMedia._id': req.body.notifId }, { $set: { 'AcceToMedia.$.VuAcceMed': true } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Notifs.findOneAndUpdate({ userRef: req.body.userId }, { $inc: { badge: -1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
};



exports.findPeople = (req, res) => {
    let following = req.profile.following;
    following.push(req.profile._id);
    User.find({ _id: { $nin: following } }, (err, users) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json(users);
    })
        .select("username email");
};

exports.online = (req, res) => {
    User.findByIdAndUpdate(req.body.userId, { $set: { status: true } }, { new: true })

        .exec((err, result) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};

exports.offline = (req, res) => {
    User.findByIdAndUpdate(req.body.userId, { $set: { status: false } }, { new: true })

        .exec((err, result) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};

exports.updateUserlocation = (req, res) => {
    Location.findOneAndUpdate({ userRef: req.body.userId }, { $set: { alt: req.body.alt, long: req.body.long }, }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
};

exports.locationOn = (req, res) => {
    Location.findOneAndUpdate({ userRef: req.body.userId }, { $set: { perm: true }, }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
};

exports.locationOff = (req, res) => {
    Location.findOneAndUpdate({ userRef: req.body.userId }, { $set: { perm: false }, }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
};

exports.changepassword = (req, res) => {

    const password = req.body.password;
    const newpass1 = req.body.newpass1;
    const newpass2 = req.body.newpass2;

    let user = req.profile;


    if (!user) {
        return res.status(400).json({
            error: "User with that username does not exist. Please signup. "
        });
    }

    if (!user.authenticate(req.body.password)) {
        return res.status(400).json({
            err: "password is incorrect. try again"
        });
    }

    if (!password || !newpass1 || !newpass2) {
        return res.status(400).json({
            error: "plz fill in the blanks lol"
        });
    }
    if (newpass1 != newpass2) {
        return res.status(400).json({
            error: "new password doesnt match"
        });
    }

    user.password = newpass1;

    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        res.json(user);
    });

};

exports.deactivateAccount = (req, res) => {

    let user = req.profile;


    if (!user.authenticate(req.body.password)) {
        return res.status(400).json({
            makhtafch: true
        });
    }

    user.deactivate = true;
    user.status = false;

    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                makhtafch: true
            })
        }
    });

    res.clearCookie("t")
    return res.status(200).json({ khtaf: true })

};

exports.deleteprofilepic = (req, res) => {

    let user = req.profile;

    if (!user) {
        return res.status(400).json({
            error: "User with that username does not exist. Please signup. "
        });
    }

    const base64Data = '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';
    user.photo.data = Buffer(base64Data, 'base64');
    user.photo.contentType = 'image/jpg'



    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.deleteAcces = (req, res) => {

    Album.findOneAndUpdate({ userRef: req.body.userId }, { $pull: { authorized: req.body.friendId }, $pull: { authorizedone: { authorized: req.body.friendId } }, $pull: { authorizedone: { authorized: req.body.friendId } } }, { new: true },)
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });

};







