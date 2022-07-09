import ENV from '../../env';



export const SET_NOTIFS = 'SET_NOTIFS';


export const VU_LIKE_NOTIF = 'VU_LIKE_NOTIF';
export const VU_COMENT_NOTIF = 'VU_COMENT_NOTIF';
export const VU_HEAR_REQ_NOTIF = 'VU_HEAR_REQ_NOTIF';
export const VU_HEART_ACCPT_NOTIF = 'VU_HEART_ACCPT_NOTIF';



export const VU_FRIEND_REQ_NOTIF = 'VU_FRIEND_REQ_NOTIF';
export const VU_FRIEND_ACCPT_NOTIF = 'VU_FRIEND_ACCPT_NOTIF';
export const VU_JUM_REQ_NOTIF = 'VU_JUM_REQ_NOTIF';
export const VU_JUM_ACCPT_NOTIF = 'VU_JUM_ACCPT_NOTIF';
export const VU_ACCES_MEDIA_NOTIF = 'VU_ACCES_MEDIA_NOTIF';


export const VU_PARTICIPATE_NOTIF = 'VU_PARTICIPATE_NOTIF';
export const VU_EVENT_INVI_NOTIF = 'VU_EVENT_INVI_NOTIF';





export const fetchNotifs = () => {
    return async (dispatch, getState) => {
        const response = await fetch(`${ENV.apiUrl}/notifs`);

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        dispatch({
            type: SET_NOTIFS,
            notifs: resData
        })
    }
};


export const likeNotifSeen = (notifId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const notifs = getState().notifs.allNotifs;
        const userIndx = notifs.findIndex(n => n.userRef === userId)
        const notifIndx = notifs[userIndx].postLike.findIndex(n => n._id === notifId)
        if (notifs[userIndx].postLike[notifIndx].VuPostLike === false) { // means that notif mezelt matratech
            dispatch({
                type: VU_LIKE_NOTIF,
                userId: userId,
                notifIndx: notifIndx,
            });

            const response = await fetch(`${ENV.apiUrl}/post/Vulike`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, notifId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};


export const commentNotifSeen = (notifId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const notifs = getState().notifs.allNotifs;
        const userIndx = notifs.findIndex(n => n.userRef === userId)
        const notifIndx = notifs[userIndx].postComment.findIndex(n => n._id === notifId)
        if (notifs[userIndx].postComment[notifIndx].VuPostComment === false) { // means that notif mezelt matratech
            dispatch({
                type: VU_COMENT_NOTIF,
                userId: userId,
                notifIndx: notifIndx,
            });

            const response = await fetch(`${ENV.apiUrl}/post/VuComment`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, notifId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};


export const frienReqNotifSeen = (notifId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const notifs = getState().notifs.allNotifs;
        const userIndx = notifs.findIndex(n => n.userRef === userId)
        const notifIndx = notifs[userIndx].friendReq.findIndex(n => n._id === notifId)
        if (notifs[userIndx].friendReq[notifIndx].VuFriendReq === false) { // means that notif mezelt matratech
            dispatch({
                type: VU_FRIEND_REQ_NOTIF,
                userId: userId,
                notifIndx: notifIndx,
            });

            const response = await fetch(`${ENV.apiUrl}/user/VuFriendReq`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, notifId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};


export const frienAcceptNotifSeen = (notifId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const notifs = getState().notifs.allNotifs;
        const userIndx = notifs.findIndex(n => n.userRef === userId)
        const notifIndx = notifs[userIndx].friendAccept.findIndex(n => n._id === notifId)
        if (notifs[userIndx].friendAccept[notifIndx].VuFriendAcc === false) { // means that notif mezelt matratech
            dispatch({
                type: VU_FRIEND_ACCPT_NOTIF,
                userId: userId,
                notifIndx: notifIndx,
            });

            const response = await fetch(`${ENV.apiUrl}/user/VuFriendAcc`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, notifId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};




export const jumlageReqNotifSeen = (notifId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const notifs = getState().notifs.allNotifs;
        const userIndx = notifs.findIndex(n => n.userRef === userId)
        const notifIndx = notifs[userIndx].jumlageReq.findIndex(n => n._id === notifId)
        if (notifs[userIndx].jumlageReq[notifIndx].VuJumlageReq === false) { // means that notif mezelt matratech
            dispatch({
                type: VU_JUM_REQ_NOTIF,
                userId: userId,
                notifIndx: notifIndx,
            });

            const response = await fetch(`${ENV.apiUrl}/user/VuJumlageReq`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, notifId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};


export const jumlageAcceptNotifSeen = (notifId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const notifs = getState().notifs.allNotifs;
        const userIndx = notifs.findIndex(n => n.userRef === userId)
        const notifIndx = notifs[userIndx].jumlageAccept.findIndex(n => n._id === notifId)
        if (notifs[userIndx].jumlageAccept[notifIndx].VuJumlageAcc === false) { // means that notif mezelt matratech
            dispatch({
                type: VU_JUM_ACCPT_NOTIF,
                userId: userId,
                notifIndx: notifIndx,
            });

            const response = await fetch(`${ENV.apiUrl}/user/VuJumlageAcc`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, notifId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};



export const participateNotifSeen = (notifId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const notifs = getState().notifs.allNotifs;
        const userIndx = notifs.findIndex(n => n.userRef === userId)
        const notifIndx = notifs[userIndx].eventPart.findIndex(n => n._id === notifId)
        if (notifs[userIndx].eventPart[notifIndx].VuEventPart === false) { // means that notif mezelt matratech
            dispatch({
                type: VU_PARTICIPATE_NOTIF,
                userId: userId,
                notifIndx: notifIndx,
            });

            const response = await fetch(`${ENV.apiUrl}/event/VuParticipate`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, notifId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};



export const inviteNotifSeen = (notifId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const notifs = getState().notifs.allNotifs;
        const userIndx = notifs.findIndex(n => n.userRef === userId)
        const notifIndx = notifs[userIndx].eventInv.findIndex(n => n._id === notifId)
        if (notifs[userIndx].eventInv[notifIndx].VuEventInv === false) { // means that notif mezelt matratech
            dispatch({
                type: VU_EVENT_INVI_NOTIF,
                userId: userId,
                notifIndx: notifIndx,
            });

            const response = await fetch(`${ENV.apiUrl}/event/VuInvPart`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, notifId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};



export const heartReqNotifSeen = (notifId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const notifs = getState().notifs.allNotifs;
        const userIndx = notifs.findIndex(n => n.userRef === userId)
        const notifIndx = notifs[userIndx].heartReq.findIndex(n => n._id === notifId)
        if (notifs[userIndx].heartReq[notifIndx].VuHeartReq === false) { // means that notif mezelt matratech
            dispatch({
                type: VU_HEAR_REQ_NOTIF,
                userId: userId,
                notifIndx: notifIndx,
            });

            const response = await fetch(`${ENV.apiUrl}/post/VuHeartReq`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, notifId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};


export const heartAcceptNotifSeen = (notifId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const notifs = getState().notifs.allNotifs;
        const userIndx = notifs.findIndex(n => n.userRef === userId)
        const notifIndx = notifs[userIndx].heartAccept.findIndex(n => n._id === notifId)
        if (notifs[userIndx].heartAccept[notifIndx].VuHeartAcc === false) { // means that notif mezelt matratech
            dispatch({
                type: VU_HEART_ACCPT_NOTIF,
                userId: userId,
                notifIndx: notifIndx,
            });

            const response = await fetch(`${ENV.apiUrl}/post/VuHeartAcc`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, notifId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};


export const accessMediaNotifSeen = (notifId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const notifs = getState().notifs.allNotifs;
        const userIndx = notifs.findIndex(n => n.userRef === userId)
        const notifIndx = notifs[userIndx].AcceToMedia.findIndex(n => n._id === notifId)
        if (notifs[userIndx].AcceToMedia[notifIndx].VuAcceMed === false) { // means that notif mezelt matratech
            dispatch({
                type: VU_ACCES_MEDIA_NOTIF,
                userId: userId,
                notifIndx: notifIndx,
            });

            const response = await fetch(`${ENV.apiUrl}/user/VuAccesMedia`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, notifId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};

