const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

const Event = require('../models/event');
const Participants = require('../models/participants');
const Notifs = require('../models/notifications');
const User = require('../models/user');
const Category = require('../models/category');


exports.eventById = (req, res, next, id) => {
    Event.findById(id)
        .populate("postedBy", "_id username")
        .populate('postedBy', '_id username')
        .select('_id title place description date starttime endtime created updated category invitedUsers longitude latitude photo ')
        .exec((err, event) => {
            if (err || !event) {
                return res.status(400).json({
                    error: err
                });
            }
            req.event = event;
            next();
        });
};

exports.getEvents = (req, res) => {
    const skip = req.query.skip;
    console.log(skip)
    const events = Event.find()
        .skip(parseInt(skip))
        .limit(2)
        .populate("postedBy", "_id username")
        .populate('comments', 'text created')
        .populate('comments.postedBy', '_id username')
        .select("_id title place description date starttime endtime created likes")
        .sort({ created: -1 })
        .then((events) => {
            res.json(events);
        })
        .catch(err => console.log(err));
};

exports.getAllEventsRn = (req, res) => {
    const events = Event.find()

        .populate('postedBy', '_id username updated')
        .select('_id title place description date invitedUsers starttime endtime created updated category longitude latitude photo ')
        .sort({ created: -1 })
        .then((events) => {
            res.json(events);
        })
        .catch(err => console.log(err));

}

exports.allcategory = (req, res) => {
    Category.find()

        .exec((err, category) => {
            if (err || !category) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            return res.json(category);
        })
};

exports.getAllParticipantsRn = (req, res) => {
    const parts = Participants.find()


        .then((parts) => {
            res.json(parts);
        })
        .catch(err => console.log(err));

}


exports.countEvents = (req, res) => {
    Event.count()
        .then((data) => {
            res.json({ data })
        })
        .catch(err => console.log(err))
}

exports.createEvent = async (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {

        let event = new Event(fields);
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        event.postedBy = req.profile;

        if (files.photo) {
            event.photo.data = fs.readFileSync(files.photo.path);
            event.photo.contentType = files.photo.type;
        }


        await event.save();

        let participants = new Participants(fields);

        participants.refevent = event._id;
        await participants.save();
        res.status(200).json({ message: "Signup success! Please Login. " });
    });

};

exports.createEventRn = async (req, res, next) => {
    let fields = {};
    fields.title = req.body.title;
    fields.place = req.body.place;
    fields.description = req.body.description;
    fields.date = req.body.date;
    fields.starttime = req.body.starttime;
    fields.endtime = req.body.endtime;
    fields.category = req.body.category;

    let event = new Event(fields);

    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    event.postedBy = req.profile;
    event.photo.data = Buffer.from(req.body.base64Data, 'base64');
    event.photo.contentType = req.body.imageType;


    let participants = new Participants();
    participants.refevent = event._id;
    await participants.save();

    await event.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(result);
    });

};

exports.getEventPhotoRn = (req, res) => {
    var base64 = 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAAB3RJTUUH1QEHDxEhOnxCRgAAAAlwSFlzAAAK8AAACvABQqw0mAAAAXBJREFUeNrtV0FywzAIxJ3+K/pZyctKXqamji0htEik9qEHc3JkWC2LRPCS6Zh9HIy/AP4FwKf75iHEr6eU6Mt1WzIOFjFL7IFkYBx3zWBVkkeXAUCXwl1tvz2qdBLfJrzK7ixNUmVdTIAB8PMtxHgAsFNNkoExRKA+HocriOQAiC+1kShhACwSRGAEwPP96zYIoE8Pmph9qEWWKcCWRAfA/mkfJ0F6dSoA8KW3CRhn3ZHcW2is9VOsAgoqHblncAsyaCgcbqpUZQnWoGTcp/AnuwCoOUjhIvCvN59UBeoPZ/AYyLm3cWVAjxhpqREVaP0974iVwH51d4AVNaSC8TRNNYDQEFdlzDW9ob10YlvGQm0mQ+elSpcCCBtDgQD7cDFojdx7NIeHJkqi96cOGNkfZOroZsHtlPYoR7TOp3Vmfa5+49uoSSRyjfvc0A1kLx4KC6sNSeDieD1AWhrJLe0y+uy7b9GjP83l+m68AJ72AwSRPN5g7uwUAAAAAElFTkSuQmCC';
    var img = Buffer.from(base64, 'base64');

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });
    res.end(img);
}

exports.eventsByUser = (req, res) => {
    Event.find({ postedBy: req.profile._id })
        .populate("postedBy", "_id username")
        .populate('comments.postedBy', '_id username')
        .populate('postedBy', '_id username')
        .select('_id title place description created likes comments updated')
        .sort({ created: -1 })
        .exec((err, events) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(events)
        });
};

exports.isPoster = (req, res, next) => {
    let isPoster = req.event && req.auth && req.event.postedBy._id == req.auth._id
    if (!isPoster) {
        return res.status(403).json({
            error: "User is not authorized !"
        });
    }
    next();
};

exports.updateEvent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }
        //save post
        let event = req.event;
        event = _.extend(event, fields);
        event.updated = Date.now();

        if (files.photo) {
            event.photo.data = fs.readFileSync(files.photo.path);
            event.photo.contentType = files.photo.type;
        }
        event.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(event);
        });
    });
};

exports.updateEventRn = (req, res) => {
    let event = req.event;
    event = _.extend(event, req.body);

    event.updated = Date.now();

    if (req.body.base64Data && req.body.imageType) {
        event.photo.data = Buffer.from(req.body.base64Data, 'base64');
        event.photo.contentType = req.body.imageType;
    }

    console.log("UPDATED EVENT ", event);

    event.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(result);
    });
}

exports.deleteEvent = (req, res) => {
    let event = req.event;
    event.remove((err, event) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.status(200).json({ message: " event deleted " });
    });
};


exports.photo = (req, res, next) => {
    res.set("Content-Type", req.event.photo.contentType);
    return res.send(req.event.photo.data);
    next();
};

exports.singleEvent = (req, res) => {
    return res.json(req.event);
}














exports.countParticipants = (req, res) => {
    Participants.parts.count()
        .then((data) => {
            res.json({ data })
        })
        .catch(err => console.log(err))
}

exports.participate = async (req, res) => {


    const juice = {
        participant: req.body.userId,
        event: req.body.eventId,
    };


    Notifs.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { eventPart: juice }, $inc: { badge: 1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    User.findByIdAndUpdate(req.body.userId, { $addToSet: { events: req.body.eventId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Participants.findOneAndUpdate({ refevent: req.body.eventId }, { $addToSet: { parts: req.body.userId } }, { new: true })
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

exports.VuParticipate = async (req, res) => {

    Notifs.findOneAndUpdate({ 'eventPart._id': req.body.notifId }, { $set: { 'eventPart.$.VuEventPart': true } }, { new: true })
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


exports.unparticipate = (req, res) => {
    //  & userId comes from front end
    User.findByIdAndUpdate(req.body.userId, { $pull: { events: req.body.eventId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Participants.findOneAndUpdate({ refevent: req.body.eventId }, { $pull: { parts: req.body.userId } }, { new: true })
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


exports.invtoevent = async (req, res) => {

    const juice = {
        inviter: req.body.userId,
        event: req.body.eventId
    };

    Notifs.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { eventInv: juice }, $inc: { badge: 1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Event.findOneAndUpdate({ _id: req.body.eventId }, { $addToSet: { invitedUsers: req.body.friendId } }, { new: true })
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

exports.VuInvPart = async (req, res) => {

    Notifs.findOneAndUpdate({ 'eventInv._id': req.body.notifId }, { $set: { 'eventInv.$.VuEventInv': true } }, { new: true })
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
