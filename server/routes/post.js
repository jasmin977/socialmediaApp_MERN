const express = require('express')

const { requireSignin } = require('../controllers/auth');
const { deletemedia, getAllmediaRn, updateMedia, MediaById, addImgToPost, VuHeartAcc, VuHeartReq, VuComment, Vulike, createpostnoph, declineHeart, acceptHeart, heartRequest, getPosts, createPost, postsByUser, postById, isPoster, deletePost, updatePost, photo, singlePost, like, unlike, comment, uncomment, countPosts, createPostRn, getAllPostsRn, updatePostRn } = require('../controllers/post')
const { userById } = require('../controllers/user');
const { createPostValidator } = require('../validator/index');

const router = express.Router();

router.put("/post/VuComment", requireSignin, VuComment);
router.put("/post/Vulike", requireSignin, Vulike);
router.put("/post/VuHeartReq", requireSignin, VuHeartReq);
router.put("/post/VuHeartAcc", requireSignin, VuHeartAcc);



router.get('/posts', getPosts);
router.get('/rn/allposts', getAllPostsRn);

router.get('/count/posts', countPosts);

//like unlike
router.put("/post/like", requireSignin, like);


router.put("/post/unlike", requireSignin, unlike);

//comments
router.put("/post/comment", requireSignin, comment);


router.put("/post/uncomment", requireSignin, uncomment);



//////////////////////////////


router.post("/post/new/:userId", requireSignin, createPost, createPostValidator);
router.post("/rn/post/new/:userId", requireSignin, createPostRn);

router.post("/rn/post/new/image/:postId", requireSignin, addImgToPost);

router.put("/media/:mediaId", requireSignin, updateMedia);

router.get('/rn/allmedia', getAllmediaRn);

router.delete("/post/:postId", requireSignin, deletePost);
router.delete("/media/:mediaId", requireSignin, deletemedia);




router.post("/rn/post/new/nophoto/:userId", requireSignin, createpostnoph);




router.get("/post/by/:userId", postsByUser);
router.get("/post/:postId", singlePost);


router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.put("/rn/post/:postId", requireSignin, isPoster, updatePostRn);




router.get("/media/photo/:mediaId", photo);


router.put("/sendheart", requireSignin, heartRequest);
router.put("/acceptheart", requireSignin, acceptHeart);
router.put("/declineheart", requireSignin, declineHeart);






// any route containing :userId, this is execute first
router.param("userId", userById);
// any route containing :postId, this is execute first
router.param("postId", postById);
router.param("mediaId", MediaById);

module.exports = router;