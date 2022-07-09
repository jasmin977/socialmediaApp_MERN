const express = require('express')

const { requireSignin } = require('../controllers/auth');
const { allcategory, VuInvPart, VuParticipate, invtoevent, getAllParticipantsRn, getEvents, createEvent, eventsByUser, eventById, isPoster, deleteEvent, updateEvent, photo, singleEvent, countEvents, createEventRn, getAllEventsRn, updateEventRn, countParticipants, participantsById, unparticipate, participate } = require('../controllers/event')
const { userById } = require('../controllers/user');


const router = express.Router();



router.put("/event/VuParticipate", requireSignin, VuParticipate);
router.put("/event/VuInvPart", requireSignin, VuInvPart);




router.get('/events', getEvents);
router.get('/rn/allevents', getAllEventsRn);
router.get('/rn/allparicipants', getAllParticipantsRn);

router.get('/count/events', countEvents);



router.get('/category', allcategory);

//like unlike


router.post("/event/new/:userId", requireSignin, createEvent);
router.post("/rn/event/new/:userId", requireSignin, createEventRn);


router.get("/event/by/:userId", eventsByUser);
router.get("/event/:eventId", singleEvent);

router.put("/event/:eventId", requireSignin, isPoster, updateEvent);
router.put("/rn/event/:eventId", requireSignin, isPoster, updateEventRn);

router.delete("/event/:eventId", requireSignin, isPoster, deleteEvent);

//post's photo
router.get("/event/photo/:eventId", photo);


router.get('/count/participants', countParticipants);

router.put("/paricipants/add", requireSignin, participate);
router.put("/paricipants/remove", requireSignin, unparticipate);

// invite friend to an event
router.put("/cha3maltou/5bebil", requireSignin, invtoevent);// hedhi mte3 l 5bebil !!!!


// any route containing :userId, this is execute first
router.param("userId", userById);
// any route containing :postId, this is execute first
router.param("eventId", eventById);


module.exports = router;