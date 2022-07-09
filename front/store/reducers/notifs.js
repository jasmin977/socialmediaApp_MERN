import {
    SET_NOTIFS, VU_LIKE_NOTIF, VU_COMENT_NOTIF, VU_HEAR_REQ_NOTIF, VU_HEART_ACCPT_NOTIF,
    VU_FRIEND_REQ_NOTIF, VU_FRIEND_ACCPT_NOTIF, VU_JUM_REQ_NOTIF, VU_JUM_ACCPT_NOTIF, VU_ACCES_MEDIA_NOTIF,
    VU_PARTICIPATE_NOTIF, VU_EVENT_INVI_NOTIF

} from "../actions/notifs";


const initialState = {
    allNotifs: [],

};



export default (state = initialState, action) => {
    switch (action.type) {

        case SET_NOTIFS:
            return {
                ...state,
                allNotifs: action.notifs
            }

        case VU_LIKE_NOTIF:
            const myIndx = state.allNotifs.findIndex(n => n.userRef === action.userId);
            const updatedLikesNotif = [...state.allNotifs];
            // this liitle notif twali trat => vuPostLike= true
            updatedLikesNotif[myIndx].postLike[action.notifIndx].VuPostLike = true;
            // our notif badge ton9os -1
            updatedLikesNotif[myIndx].badge = updatedLikesNotif[myIndx].badge - 1;

            return {
                ...state,
                allNotifs: updatedLikesNotif
            }


        case VU_COMENT_NOTIF:
            const myIdx = state.allNotifs.findIndex(n => n.userRef === action.userId);
            const updatedComentsNotif = [...state.allNotifs];
            // this liitle notif twali trat donc  VuPostComment= true
            updatedComentsNotif[myIdx].postComment[action.notifIndx].VuPostComment = true;
            // our notif badge ton9os -1
            updatedComentsNotif[myIdx].badge = updatedComentsNotif[myIdx].badge - 1;

            return {
                ...state,
                allNotifs: updatedComentsNotif
            }


        case VU_FRIEND_REQ_NOTIF:
            const myyIdx = state.allNotifs.findIndex(n => n.userRef === action.userId);
            const updatedFriReqNotif = [...state.allNotifs];
            // this liitle notif twali trat donc  VuFriendReq= true
            updatedFriReqNotif[myyIdx].friendReq[action.notifIndx].VuFriendReq = true;
            // our notif badge ton9os -1
            updatedFriReqNotif[myyIdx].badge = updatedFriReqNotif[myyIdx].badge - 1;

            return {
                ...state,
                allNotifs: updatedFriReqNotif
            }

        case VU_FRIEND_ACCPT_NOTIF:
            const myyIndx = state.allNotifs.findIndex(n => n.userRef === action.userId);
            const updatedFriAcceptNotif = [...state.allNotifs];
            // this liitle notif twali trat donc  VuFriendAcc= true
            updatedFriAcceptNotif[myyIndx].friendAccept[action.notifIndx].VuFriendAcc = true;
            // our notif badge ton9os -1
            updatedFriAcceptNotif[myyIndx].badge = updatedFriAcceptNotif[myyIndx].badge - 1;

            return {
                ...state,
                allNotifs: updatedFriAcceptNotif
            }


        case VU_JUM_REQ_NOTIF:
            const myIdxJum = state.allNotifs.findIndex(n => n.userRef === action.userId);
            const updatedJumReqNotif = [...state.allNotifs];
            // this liitle notif twali trat donc  VuJumlageReq= true
            updatedJumReqNotif[myIdxJum].jumlageReq[action.notifIndx].VuJumlageReq = true;
            // our notif badge ton9os -1
            updatedJumReqNotif[myIdxJum].badge = updatedJumReqNotif[myIdxJum].badge - 1;

            return {
                ...state,
                allNotifs: updatedJumReqNotif
            }

        case VU_JUM_ACCPT_NOTIF:
            const IndxJJ = state.allNotifs.findIndex(n => n.userRef === action.userId);
            const updatedJumAcceptNotif = [...state.allNotifs];
            // this liitle notif twali trat donc  VuJumlageAcc= true
            updatedJumAcceptNotif[IndxJJ].jumlageAccept[action.notifIndx].VuJumlageAcc = true;
            // our notif badge ton9os -1
            updatedJumAcceptNotif[IndxJJ].badge = updatedJumAcceptNotif[IndxJJ].badge - 1;

            return {
                ...state,
                allNotifs: updatedJumAcceptNotif
            }



        case VU_PARTICIPATE_NOTIF:
            const partIndx = state.allNotifs.findIndex(n => n.userRef === action.userId);
            const updatedParticiNotif = [...state.allNotifs];
            // this liitle notif twali trat donc  VuEventPart= true
            updatedParticiNotif[partIndx].eventPart[action.notifIndx].VuEventPart = true;
            // our notif badge ton9os -1
            updatedParticiNotif[partIndx].badge = updatedParticiNotif[partIndx].badge - 1;

            return {
                ...state,
                allNotifs: updatedParticiNotif
            }

        case VU_EVENT_INVI_NOTIF:
            const IndxInvi = state.allNotifs.findIndex(n => n.userRef === action.userId);
            const updatedInviEventNotif = [...state.allNotifs];
            // this liitle notif twali trat donc  VuEventInv= true
            updatedInviEventNotif[IndxInvi].eventInv[action.notifIndx].VuEventInv = true;
            // our notif badge ton9os -1
            updatedInviEventNotif[IndxInvi].badge = updatedInviEventNotif[IndxInvi].badge - 1;

            return {
                ...state,
                allNotifs: updatedInviEventNotif
            }





        case VU_HEAR_REQ_NOTIF:
            const IdxHeart = state.allNotifs.findIndex(n => n.userRef === action.userId);
            const updatedHeartReqNotif = [...state.allNotifs];
            // this liitle notif twali trat donc  VuHeartReq= true
            updatedHeartReqNotif[IdxHeart].heartReq[action.notifIndx].VuHeartReq = true;
            // our notif badge ton9os -1
            updatedHeartReqNotif[IdxHeart].badge = updatedHeartReqNotif[IdxHeart].badge - 1;

            return {
                ...state,
                allNotifs: updatedHeartReqNotif
            }

        case VU_HEART_ACCPT_NOTIF:
            const IndxHAccpt = state.allNotifs.findIndex(n => n.userRef === action.userId);
            const updatedHeartAcceptNotif = [...state.allNotifs];
            // this liitle notif twali trat donc  VuHeartAcc= true
            updatedHeartAcceptNotif[IndxHAccpt].heartAccept[action.notifIndx].VuHeartAcc = true;
            // our notif badge ton9os -1
            updatedHeartAcceptNotif[IndxHAccpt].badge = updatedHeartAcceptNotif[IndxHAccpt].badge - 1;

            return {
                ...state,
                allNotifs: updatedHeartAcceptNotif
            }



        case VU_ACCES_MEDIA_NOTIF:
            const IndxAcces = state.allNotifs.findIndex(n => n.userRef === action.userId);
            const updatedAccestNotif = [...state.allNotifs];
            // this liitle notif twali trat donc  VuAcceMed= true
            updatedAccestNotif[IndxAcces].AcceToMedia[action.notifIndx].VuAcceMed = true;
            // our notif badge ton9os -1
            updatedAccestNotif[IndxAcces].badge = updatedAccestNotif[IndxAcces].badge - 1;

            return {
                ...state,
                allNotifs: updatedAccestNotif
            }



        default:
            return state;
    }
}