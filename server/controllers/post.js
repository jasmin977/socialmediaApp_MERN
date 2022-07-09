const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

const Post = require('../models/post');
const Notifs = require('../models/notifications');
const Album = require('../models/album');
const Media = require('../models/media');

exports.postById = (req, res, next, id) => {
    Post.findById(id)
        .populate("postedBy", "_id username")
        .populate('comments.postedBy', '_id username')
        .populate('mediaRef', '_id postRef photo updated created')
        .select('_id body tags created likes comments requested authorized visible privacy updated')
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({
                    error: err
                });
            }
            req.post = post;
            next();
        });
};

exports.MediaById = (req, res, next, id) => {
    Media.findById(id)

        .select('_id created updated photo')
        .exec((err, media) => {
            if (err || !media) {
                return res.status(400).json({
                    error: err
                });
            }
            req.media = media;
            next();
        });
};

exports.getPosts = (req, res) => {
    const skip = req.query.skip;
    console.log(skip)
    const posts = Post.find()
        .skip(parseInt(skip))
        .limit(2)
        .populate("postedBy", "_id username")
        .populate('comments', 'text created')
        .populate('comments.postedBy', '_id username')
        .select("_id  body created likes")
        .sort({ created: -1 })
        .then((posts) => {
            res.json(posts);
        })
        .catch(err => console.log(err));
};





exports.getAllPostsRn = (req, res) => {
    const posts = Post.find()
        .populate('comments.postedBy', '_id username updated')
        .populate('postedBy', '_id username updated')
        .populate('mediaRef', '_id postRef updated created')
        .select('_id body tags created likes comments updated requested authorized visible privacy')
        .sort({ created: -1 })
        .then((posts) => {
            res.json(posts);
        })
        .catch(err => console.log(err));

}

exports.getAllmediaRn = (req, res) => {
    const media = Media.find()
        .select('_id created updated postRef')
        .then((media) => {
            res.json(media);
        })
        .catch(err => console.log(err));

}





exports.countPosts = (req, res) => {
    Post.count()
        .then((data) => {
            res.json({ data })
        })
        .catch(err => console.log(err))
}


exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    console.log(form);
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        let post = new Post(fields);
        console.log(fields);
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;
        console.log(files);
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
        if (post.private) {
            Album.findOneAndUpdate({ userRef: post.postedBy._id }, { $addToSet: { private: post._id } }, { new: true })
                .exec((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        })
                    }
                });

        } else {
            Album.findOneAndUpdate({ userRef: post.postedBy._id }, { $addToSet: { public: post._id } }, { new: true })
                .exec((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        })
                    }
                });

        }

    });
};













exports.createPostRn = async (req, res) => {
    let fields = {};

    fields.body = req.body.body;
    fields.privacy = req.body.privacy;
    fields.tags = req.body.tags;


    let post = new Post(fields);


    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;

    // post.photo.data = Buffer.from(req.body.base64Data, 'base64');
    // post.photo.contentType = req.body.imageType;

    post.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        if (post.privacy) {
            Album.findOneAndUpdate({ userRef: post.postedBy._id }, { $addToSet: { private: post._id } }, { new: true })
                .exec((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        })
                    }
                });

        } else {
            Album.findOneAndUpdate({ userRef: post.postedBy._id }, { $addToSet: { public: post._id } }, { new: true })
                .exec((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        })
                    }
                });

        }

        res.json(result);
    });

};

exports.addImgToPost = async (req, res) => {

    ape = req.post;

    let juice = {};
    juice.postRef = ape._id;

    let media = new Media(juice);

    media.photo.data = Buffer.from(req.body.base64Data, 'base64');
    media.photo.contentType = req.body.imageType;




    media.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        Post.findOneAndUpdate({ _id: ape._id }, { $addToSet: { mediaRef: media._id } }, { new: true })
            .exec((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    })
                }
            });

        res.json(result);
    });

};



exports.updateMedia = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }

        ape = req.media;

        ape.updated = Date.now();

        if (files.photo) {
            ape.photo.data = fs.readFileSync(files.photo.path);
            ape.photo.contentType = files.photo.type;
        }
        ape.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }

            res.json(ape);
        });
    });
};

































exports.getPostPhotoRn = (req, res) => {
    var base64 = 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAAB3RJTUUH1QEHDxEhOnxCRgAAAAlwSFlzAAAK8AAACvABQqw0mAAAAXBJREFUeNrtV0FywzAIxJ3+K/pZyctKXqamji0htEik9qEHc3JkWC2LRPCS6Zh9HIy/AP4FwKf75iHEr6eU6Mt1WzIOFjFL7IFkYBx3zWBVkkeXAUCXwl1tvz2qdBLfJrzK7ixNUmVdTIAB8PMtxHgAsFNNkoExRKA+HocriOQAiC+1kShhACwSRGAEwPP96zYIoE8Pmph9qEWWKcCWRAfA/mkfJ0F6dSoA8KW3CRhn3ZHcW2is9VOsAgoqHblncAsyaCgcbqpUZQnWoGTcp/AnuwCoOUjhIvCvN59UBeoPZ/AYyLm3cWVAjxhpqREVaP0974iVwH51d4AVNaSC8TRNNYDQEFdlzDW9ob10YlvGQm0mQ+elSpcCCBtDgQD7cDFojdx7NIeHJkqi96cOGNkfZOroZsHtlPYoR7TOp3Vmfa5+49uoSSRyjfvc0A1kLx4KC6sNSeDieD1AWhrJLe0y+uy7b9GjP83l+m68AJ72AwSRPN5g7uwUAAAAAElFTkSuQmCC';
    var img = Buffer.from(base64, 'base64');

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });
    res.end(img);
}

exports.postsByUser = (req, res) => {
    Post.find({ postedBy: req.profile._id })
        .populate("postedBy", "_id username")
        .populate('comments.postedBy', '_id username')
        .populate('postedBy', '_id username')
        .select('_id body created likes comments updated')
        .sort({ created: -1 })
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(posts)
        });
};

exports.isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id
    if (!isPoster) {
        return res.status(403).json({
            error: "User is not authorized !"
        });
    }
    next();
};













exports.updatePost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }
        //save post
        let post = req.post;
        post = _.extend(post, fields);
        post.updated = Date.now();

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            if (post.privacy) {
                Album.findOneAndUpdate({ userRef: post.postedBy._id }, { $addToSet: { private: post._id }, $pull: { public: post._id } }, { new: true })
                    .exec((err, result) => {
                        if (err) {
                            return res.status(400).json({
                                error: err
                            })
                        }
                    });

            } else {
                Album.findOneAndUpdate({ userRef: post.postedBy._id }, { $addToSet: { public: post._id }, $pull: { private: post._id } }, { new: true })
                    .exec((err, result) => {
                        if (err) {
                            return res.status(400).json({
                                error: err
                            })
                        }
                    });

            }
            res.json(post);
        });
    });
};


exports.updatePostRn = async (req, res) => {
    let post = req.post;
    post = _.extend(post, req.body);

    post.updated = Date.now();


    post.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        if (post.privacy) {
            Album.findOneAndUpdate({ userRef: post.postedBy._id }, { $addToSet: { private: post._id }, $pull: { public: post._id } }, { new: true })
                .exec((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        })
                    }
                });

        } else {
            Album.findOneAndUpdate({ userRef: post.postedBy._id }, { $addToSet: { public: post._id }, $pull: { private: post._id } }, { new: true })
                .exec((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        })
                    }
                });

        }
        res.json(result);
    });
}



exports.deletePost = async (req, res) => {
    let post = req.post;
    post.remove((err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        const ape = Media.find({ postRef: post._id })
        ape.remove((err, post) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
        });

        Album.findOneAndUpdate({ userRef: post.postedBy._id }, { $pull: { private: post._id, public: post._id } }, { new: true })
            .exec((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    })

                }


            });

        res.json({
            message: "Successfully deleted the post"
        });
    });
};

exports.deletemedia = async (req, res) => {
    let media = req.media;
    media.remove((err, media) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        res.json({
            message: "Successfully deleted the photo"
        });
    });
};


exports.photo = (req, res, next) => {
    res.set("Content-Type", req.media.photo.contentType);
    return res.send(req.media.photo.data);
    next();
};

exports.singlePost = (req, res) => {
    return res.json(req.post);
}


exports.like = async (req, res) => {



    Post.findByIdAndUpdate(req.body.postId, { $addToSet: { likes: req.body.userId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {

                const juice = {
                    liker: req.body.userId,
                    post: req.body.postId,
                };
                Notifs.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { postLike: juice }, $inc: { badge: 1 } }, { new: true })
                    .exec((err, result) => {
                        if (err) {
                            return res.status(400).json({
                                error: err
                            })
                        }
                    });
                res.json(result);
            }
        });

};

exports.Vulike = async (req, res) => {

    Notifs.findOneAndUpdate({ 'postLike._id': req.body.notifId }, { $set: { 'postLike.$.VuPostLike': true } }, { new: true })
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


exports.unlike = (req, res) => {
    // postId & userId comes from front end
    Post.findByIdAndUpdate(req.body.postId, { $pull: { likes: req.body.userId } }, { new: true })
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


exports.comment = async (req, res) => {



    let comment = req.body.comment;
    comment.postedBy = req.body.userId
    await Post.findByIdAndUpdate(req.body.postId, { $push: { comments: comment } }, { new: true })
        .populate('comments.postedBy', '_id username')
        .populate('postedBy', '_id username')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {

                const juice = {
                    commentor: req.body.userId,
                    post: req.body.postId,
                };
                Notifs.findOneAndUpdate({ userRef: req.body.friendId }, { $push: { postComment: juice }, $inc: { badge: 1 } }, { new: true })
                    .exec((err, result) => {
                        if (err) {
                            return res.status(400).json({
                                error: err
                            })
                        }
                    });

                res.json(result);
            }
        });

};

exports.VuComment = async (req, res) => {

    Notifs.findOneAndUpdate({ 'postComment._id': req.body.notifId }, { $set: { 'postComment.$.VuPostComment': true } }, { new: true })
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


exports.uncomment = (req, res) => {
    //comment, postId and userId comes from frontend
    let comment = req.body.comment;
    Post.findByIdAndUpdate(req.body.postId, { $pull: { comments: { _id: comment._id } } }, { new: true })
        .populate('comments.postedBy', '_id username')
        .populate('postedBy', '_id username')
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

exports.heartRequest = async (req, res) => {
    const juice = {
        heartrequester: req.body.userId,
        post: req.body.postId,
    };
    Notifs.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { heartReq: juice }, $inc: { badge: 1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Post.findByIdAndUpdate(req.body.postId, { $addToSet: { requested: req.body.userId } }, { new: true })
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

exports.VuHeartReq = async (req, res) => {

    Notifs.findOneAndUpdate({ 'heartReq._id': req.body.notifId }, { $set: { 'heartReq.$.VuHeartReq': true } }, { new: true })
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

exports.acceptHeart = async (req, res) => {

    const juice = {
        heartaccepter: req.body.userId,
        post: req.body.postId,
    };
    Notifs.findOneAndUpdate({ userRef: req.body.friendId }, { $addToSet: { heartAccept: juice }, $inc: { badge: 1 } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        });

    Post.findByIdAndUpdate(req.body.postId, { $addToSet: { authorized: req.body.friendId }, $pull: { requested: req.body.friendId } }, { new: true })
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

exports.VuHeartAcc = async (req, res) => {

    Notifs.findOneAndUpdate({ 'heartAccept._id': req.body.notifId }, { $set: { 'heartAccept.$.VuHeartAcc': true } }, { new: true })
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

exports.declineHeart = (req, res) => {

    Post.findByIdAndUpdate(req.body.postId, { $pull: { requested: req.body.friendId } }, { new: true })
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

exports.createpostnoph = (req, res) => {
    let fields = {};

    fields.body = req.body.body;
    fields.tags = req.body.tags;



    let post = new Post(fields);
    console.log(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;


    console.log(post);



    post.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(result);
    });


};
