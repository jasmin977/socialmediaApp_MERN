const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

const Story = require('../models/story');
const Archive = require('../models/archive');

exports.storyById = (req, res, next, id) => {
    Story.findById(id)
    .populate("postedBy", "_id username")
    .select('_id views created photo')
    .exec((err, story) => {
        if(err || !story){
            return res.status(400).json({
                error: err
            });
        }
        req.story = story;
        next();
    });
};

exports.getStories = (req,res) => {
    const skip = req.query.skip;
    console.log(skip)
    const stories = Story.find()
    .skip(parseInt(skip))
    .populate("postedBy", "_id username")
    
    .select("_id views created")
    .sort({created: -1})
    .then((stories) => {
        res.json(stories);
    })
    .catch(err => console.log(err));
};

exports.getAllStoriesRn = (req,res) => {
    const stories = Story.find()
    
    .populate('postedBy', '_id username updated')
    .select('_id views created updated')
   // .sort({created: -1})
    .then((stories) => {
        res.json(stories);
    })
    .catch(err => console.log(err));
    
}

exports.getAllArchivesRn = (req,res) => {
    const stories = Archive.find()
    
    .populate('postedBy', '_id username updated')
    .select('_id views created updated')
   // .sort({created: -1})
    .then((stories) => {
        res.json(stories);
    })
    .catch(err => console.log(err)); 
}

exports.countStories = (req,res) => {
    Story.count()
    .then((data) => {
        res.json({data})
    })
    .catch(err => console.log(err))
}


exports.createStory = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    console.log(form);
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        let story = new Story(fields);
        
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        story.postedBy = req.profile;
        
        let archive = new Archive(fields);
        
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        archive.postedBy = req.profile;

        if(files.photo){
            story.photo.data = fs.readFileSync(files.photo.path);
            story.photo.contentType = files.photo.type;
        }

        story.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: err
                });
                
            }
            res.json(result);
            
            
        });

        archive.save((err, result) => {
              
        });
        
    });
    
};

exports.createStoryRn = async (req, res) => {
    let fields = {};
    let story = new Story(fields);
    
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    story.postedBy = req.profile;
    story.photo.data = Buffer.from(req.body.base64Data, 'base64');
    story.photo.contentType = req.body.imageType;

    let archive = new Archive(fields);
    
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    archive.postedBy = req.profile;
    archive.photo.data = Buffer.from(req.body.base64Data, 'base64');
    archive.photo.contentType = req.body.imageType;
    

    

    await archive.save() ;

    await story.save((err, result) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        res.json(result);
    });
    
};


exports.getStoryPhotoRn = (req,res) => {
    var base64 = 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAAB3RJTUUH1QEHDxEhOnxCRgAAAAlwSFlzAAAK8AAACvABQqw0mAAAAXBJREFUeNrtV0FywzAIxJ3+K/pZyctKXqamji0htEik9qEHc3JkWC2LRPCS6Zh9HIy/AP4FwKf75iHEr6eU6Mt1WzIOFjFL7IFkYBx3zWBVkkeXAUCXwl1tvz2qdBLfJrzK7ixNUmVdTIAB8PMtxHgAsFNNkoExRKA+HocriOQAiC+1kShhACwSRGAEwPP96zYIoE8Pmph9qEWWKcCWRAfA/mkfJ0F6dSoA8KW3CRhn3ZHcW2is9VOsAgoqHblncAsyaCgcbqpUZQnWoGTcp/AnuwCoOUjhIvCvN59UBeoPZ/AYyLm3cWVAjxhpqREVaP0974iVwH51d4AVNaSC8TRNNYDQEFdlzDW9ob10YlvGQm0mQ+elSpcCCBtDgQD7cDFojdx7NIeHJkqi96cOGNkfZOroZsHtlPYoR7TOp3Vmfa5+49uoSSRyjfvc0A1kLx4KC6sNSeDieD1AWhrJLe0y+uy7b9GjP83l+m68AJ72AwSRPN5g7uwUAAAAAElFTkSuQmCC';
    var img = Buffer.from(base64, 'base64');

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });
    res.end(img); 
}

exports.storiesByUser = (req, res) => {
    Story.find({postedBy: req.profile._id})
    .populate("postedBy", "_id username")
    
    .select('_id views created updated')
  //  .sort({created: -1})
    .exec((err, stories) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        res.json(stories)
    });
};

exports.isPoster = (req, res, next) => {
    let isPoster = req.story && req.auth && req.story.postedBy._id == req.auth._id
    if(!isPoster){
        return res.status(403).json({
            error: "User is not authorized !"
        });
    }
    next();
};


exports.updateStory = (req,res,next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }
        
        let story = req.story;
        story = _.extend(story, fields);
        story.updated = Date.now();
        
        if(files.photo){
            story.photo.data = fs.readFileSync(files.photo.path);
            story.photo.contentType = files.photo.type;
        }
        story.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
            res.json(story);
        });
    });
};


exports.updateStoryRn = (req, res) => {
    let story = req.story;
    story = _.extend(story, req.body);

    story.updated = Date.now();

    if(req.body.base64Data && req.body.imageType){
        story.photo.data = Buffer.from(req.body.base64Data, 'base64');
        story.photo.contentType = req.body.imageType;
    }

    console.log("UPDATED POST ", story);

    story.save((err, result) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        res.json(result);
    });
}

exports.deleteStory = (req, res) => {
    let story = req.story;
    story.remove((err, story) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: "Successfully deleted the story"
        });
    });
};


exports.photo = (req, res, next) => {
    res.set("Content-Type", req.story.photo.contentType);
    return res.send(req.story.photo.data);

};

exports.photoarchive = (req, res, next) => {
    res.set("Content-Type", req.archive.photo.contentType);
    return res.send(req.archive.photo.data);
};

exports.singleStory = (req,res) => {
    return res.json(req.story);
};

exports.View = (req, res) => {
    // storyId & userId comes from front end
    Story.findByIdAndUpdate(req.body.storyId, { $addToSet: {views: req.body.userId} }, {new: true})
    .exec((err, result) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        } else {
            res.status(200).json(result);
        }
    });
};

exports.archiveById = (req, res, next, id) => {
    Archive.findById(id)
    
    .exec((err, archive) => {
        if(err || !archive){
            return res.status(400).json({
                error: err
            });
        }
        req.archive = archive;
        next();
    });
};
