const express = require('express')

const { requireSignin } = require('../controllers/auth');
const { photoarchive, getAllArchivesRn, getStories, createStory, storiesByUser, storyById, isPoster, deleteStory, updateStory, photo, singleStory, countStories, createStoryRn, getAllStoriesRn, updateStoryRn, View, createArchive, createArchiveRn, archiveById } = require('../controllers/story')
const { userById } = require('../controllers/user');


const router = express.Router();

router.get('/stories', getStories);
router.get('/rn/allstories', getAllStoriesRn);
router.get('/rn/allarchives', getAllArchivesRn);

router.get('/count/story', countStories);


router.post("/story/new/:userId", requireSignin, createStory);


router.post("/rn/story/new/:userId", requireSignin, createStoryRn);



router.get("/story/by/:userId", storiesByUser);
router.get("/story/:storyId", singleStory);


router.put("/story/:storyId", requireSignin, isPoster, updateStory);
router.put("/rn/story/:storyId", requireSignin, isPoster, updateStoryRn);

router.delete("/story/:storyId", requireSignin, isPoster, deleteStory);



//story's photo
router.get("/story/photo/:storyId", photo);
// archive photo
router.get("/archive/photo/:archiveId", photoarchive);



router.put('/5bebil/view', requireSignin, View);


// any route containing :userId, this is execute first
router.param("userId", userById);
// any route containing :storyId, this is execute first
router.param("storyId", storyById);
router.param("archiveId", archiveById);
module.exports = router;