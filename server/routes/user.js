const express = require('express')

const {allLocations, deleteAcces, deleteprofilepic, deactivateAccount, VuAccesMedia, VuJumlageAcc, VuJumlageReq, VuFriendReq ,VuFriendAcc, changepassword, locationOff, locationOn, updateUserlocation, AccesMediaTwoDay, AccesMediaOneDay, AccesMediaForever, onealbums, oneJumlages, oneFriends, editUser, oneNotif, offline, online, allalbums, allJumlages, deletejumlage, declinejumlageRequest, canceljumlageRequest, jumlageaccept, jumlagerequest, blockFriend, unblockFriend, allFriends, userById, allUsers, getUser, updateUser, deleteUser, userPhoto, findPeople, updateUserRn, addFriend, sendRequest, deleteFriend, declineRequest, cancelRequest, allNotifs } = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');


const router = express.Router();



router.put("/user/deactivateAccount/:userId", requireSignin, deactivateAccount);// here !!!


router.put('/user/VuFriendAcc', requireSignin, VuFriendAcc);
router.put('/user/VuFriendReq', requireSignin, VuFriendReq);
router.put('/user/VuJumlageReq', requireSignin, VuJumlageReq);
router.put('/user/VuJumlageAcc', requireSignin, VuJumlageAcc);
router.put('/user/VuAccesMedia', requireSignin, VuAccesMedia);





// friends
router.put('/user/acceptrequest', requireSignin, addFriend);
router.put('/user/sendrequest', requireSignin, sendRequest);
router.put('/user/removefriend', requireSignin, deleteFriend);
router.put('/user/declinerequest', requireSignin, declineRequest);
router.put('/user/cancelrequest', requireSignin, cancelRequest);


// blocking
router.put('/user/blockfriend', requireSignin, blockFriend);
router.put('/user/unblockfriend', requireSignin, unblockFriend);



// jumlage
router.put('/user/jumlage/request', requireSignin, jumlagerequest);
router.put('/user/jumlage/accept', requireSignin, jumlageaccept);
router.put('/user/jumlage/cancelrequest', requireSignin, canceljumlageRequest);
router.put('/user/jumlage/declinerequest', requireSignin, declinejumlageRequest);
router.put('/user/jumlage/delete', requireSignin, deletejumlage);





// user status
router.put('/user/online', requireSignin, online);
router.put('/user/offline', requireSignin, offline);



// user location
router.put('/user/permLocOn', requireSignin, locationOn);
router.put('/user/permlocOff', requireSignin, locationOff);
router.put('/updatelocation', requireSignin, updateUserlocation);







router.put('/user/', requireSignin);

router.get("/users", allUsers);

router.get("/notifs", allNotifs);
router.get("/onenotif/:userId", oneNotif);

router.get("/friends", allFriends);
router.get("/onefriend/:userId", oneFriends);

router.get("/jumlages", allJumlages);
router.get("/onejumlage/:userId", oneJumlages);

router.get("/albums", allalbums);
router.get("/onealbum/:userId", onealbums);

router.get("/locations", allLocations);



//access media
router.put("/accesmedia", requireSignin, AccesMediaForever);
router.put("/accesmediaOne", requireSignin, AccesMediaOneDay);
router.put("/accesmediaTwo", requireSignin, AccesMediaTwoDay);



router.put("/changepassword/:userId", requireSignin, changepassword);

router.get("/user/:userId", requireSignin, getUser);

router.put("/user/:userId", requireSignin, updateUser);
router.put("/rn/user/:userId", requireSignin, updateUserRn);

router.put("/user/update/:userId", requireSignin, editUser);

router.delete("/user/delete/:userId", requireSignin, deleteUser);// delete account is here !!!

//photo
router.get("/user/photo/:userId", userPhoto);

router.put("/user/deleteprofilepic/:userId", requireSignin, deleteprofilepic);

// follow suggestions
router.get("/user/findpeople/:userId", requireSignin, findPeople);




router.put("/deleteAcces", requireSignin, deleteAcces);






// any route containing :userId, this is execute first
router.param("userId", userById);
router.param("friendId", userById);
module.exports = router;