import {
    SET_USERS, ONLINE_USER, UNBLOCK_FRIEND, BLOCK_FRIEND, ACCEPT_REQUEST, DECLINE_REQUEST, FRIEND_REQUEST, FRIEND_CANCEL_REQUEST,
    OFFLINE_USER, SET_JUMLAGES, SET_ALBUM, SET_FRIENDS, SET_FIND_PEOPLE, FOLLOW_FIND_PEOPLE, UPDATE_USER, REMOVE_FRIEND,
    ACCESS_ALBUM_4EVER, ACCESS_ALBUM_24H, ACCESS_ALBUM_48H, LOGOUT, DELETE_ACCESS,
    JUMLAGE_REQUEST, JUMLAGE_CANCEL_REQUEST, ACCEPT_JUMLAGE, DECLINE_JUMLAGE, DELETE_JUMLAGE,
    SET_PLACES,


} from "../actions/users";

const initialState = {
    allUsers: [],
    findPeople: [],
    locations: [],
    myFriends: [],
    allAlbums: [],
    allJumlages: [],
    token: null,
    user: null,
    didTryAutoLogin: false
};

export default (state = initialState, action) => {
    switch (action.type) {

        case LOGOUT:
            return {
                ...initialState,
                didTryAutoLogin: true
            };
        case SET_USERS:
            return {
                ...state,
                allUsers: action.users
            }

        case SET_FRIENDS:
            return {
                ...state,
                myFriends: action.friends
            }

        case SET_PLACES:
            return {
                ...state,
                locations: action.places
            }


        case SET_ALBUM:
            return {
                ...state,
                allAlbums: action.albums
            }
        case SET_JUMLAGES:
            return {
                ...state,
                allJumlages: action.jumlages
            }




        // friends actions________________________
        case FRIEND_REQUEST:
            const userIndex = state.myFriends.findIndex(u => u.userRef === action.friendId);
            const myIndx = state.myFriends.findIndex(u => u.userRef === action.userId);
            const updatedFriendReqUsers = [...state.myFriends];
            // add loggedin user in incominreq list of other user
            updatedFriendReqUsers[userIndex].inCommingReq = updatedFriendReqUsers[userIndex].inCommingReq.concat(action.userId);
            // add other user in outGoingReq list of logged user
            updatedFriendReqUsers[myIndx].outGoingReq = updatedFriendReqUsers[myIndx].outGoingReq.concat(action.friendId);

            return {
                ...state,
                myFriends: updatedFriendReqUsers
            }

        case FRIEND_CANCEL_REQUEST:
            const hisIndex = state.myFriends.findIndex(u => u.userRef === action.friendId);
            const mymy = state.myFriends.findIndex(u => u.userRef === action.userId);
            const updatedCancelReqUsers = [...state.myFriends];
            // remove other user in outGoingReq list of logged user
            updatedCancelReqUsers[mymy].outGoingReq = updatedCancelReqUsers[mymy].outGoingReq.filter(u => u !== action.friendId)


            // remove loggedin user in incominreq list of other user
            updatedCancelReqUsers[hisIndex].inCommingReq = updatedCancelReqUsers[hisIndex].inCommingReq.filter(u => u !== action.userId)

            return {
                ...state,
                myFriends: updatedCancelReqUsers
            }

        case ACCEPT_REQUEST:
            const him = state.myFriends.findIndex(u => u.userRef === action.friendId);
            const me = state.myFriends.findIndex(u => u.userRef === action.userId);
            const updatedFriendsUsers = [...state.myFriends];
            // add other user in my friends list and remove it from my inComming list
            updatedFriendsUsers[me].inCommingReq = updatedFriendsUsers[me].inCommingReq.filter(u => u !== action.friendId);
            updatedFriendsUsers[me].friends = updatedFriendsUsers[me].friends.concat(action.friendId);

            // add me in  user's friends list and remove me from his outGoingReq
            updatedFriendsUsers[him].outGoingReq = updatedFriendsUsers[him].outGoingReq.filter(u => u !== action.userId);
            updatedFriendsUsers[him].friends = updatedFriendsUsers[him].friends.concat(action.userId);

            return {
                ...state,
                myFriends: updatedFriendsUsers
            }

        case DECLINE_REQUEST:
            const himm = state.myFriends.findIndex(u => u.userRef === action.friendId);
            const mee = state.myFriends.findIndex(u => u.userRef === action.userId);
            const updatedDeclineFriendsUsers = [...state.myFriends];
            //  remove him from my inComming list
            updatedDeclineFriendsUsers[mee].inCommingReq = updatedDeclineFriendsUsers[mee].inCommingReq.filter(u => u !== action.friendId);
            // remove me from his outGoingReq list
            updatedDeclineFriendsUsers[himm].outGoingReq = updatedDeclineFriendsUsers[himm].outGoingReq.filter(u => u !== action.userId);

            return {
                ...state,
                myFriends: updatedDeclineFriendsUsers
            }

        case BLOCK_FRIEND:
            const hisI = state.myFriends.findIndex(u => u.userRef === action.friendId);
            const myI = state.myFriends.findIndex(u => u.userRef === action.userId);
            const updatedBlockedUsers = [...state.myFriends];
            //  remove him from my friends list and remove me from his friend list
            updatedBlockedUsers[myI].friends = updatedBlockedUsers[myI].friends.filter(u => u !== action.friendId);
            updatedBlockedUsers[hisI].friends = updatedBlockedUsers[hisI].friends.filter(u => u !== action.userId);

            // add him in my blocked list
            updatedBlockedUsers[myI].blocked = updatedBlockedUsers[myI].blocked.concat(action.friendId);

            return {
                ...state,
                myFriends: updatedBlockedUsers
            }

        case REMOVE_FRIEND:
            const hishisIndx = state.myFriends.findIndex(u => u.userRef === action.friendId);
            const mineIndx = state.myFriends.findIndex(u => u.userRef === action.userId);
            const updatedRemovedFriends = [...state.myFriends];
            //  remove him from my friends list and remove me from his friend list
            updatedRemovedFriends[mineIndx].friends = updatedRemovedFriends[mineIndx].friends.filter(u => u !== action.friendId);
            updatedRemovedFriends[hishisIndx].friends = updatedRemovedFriends[hishisIndx].friends.filter(u => u !== action.userId);


            return {
                ...state,
                myFriends: updatedRemovedFriends
            }


        case UNBLOCK_FRIEND:
            const meIndx = state.myFriends.findIndex(u => u.userRef === action.userId);
            const updatedUnblockedUsers = [...state.myFriends];
            //  remove him from my blocked list
            updatedUnblockedUsers[meIndx].blocked = updatedUnblockedUsers[meIndx].blocked.filter(u => u !== action.friendId);

            return {
                ...state,
                myFriends: updatedUnblockedUsers
            }







        // jumlage actions________________________
        case JUMLAGE_REQUEST:
            const jumReqIdx = state.allJumlages.findIndex(u => u.userRef === action.friendId);
            const myJumIndx = state.allJumlages.findIndex(u => u.userRef === action.userId);
            const updatedJumlageReq = [...state.allJumlages];
            // add loggedin user in incominreq list of other user
            updatedJumlageReq[jumReqIdx].inCommingReq = updatedJumlageReq[jumReqIdx].inCommingReq.concat(action.userId);
            // add other user in outGoingReq list of logged user
            updatedJumlageReq[myJumIndx].outGoingReq = updatedJumlageReq[myJumIndx].outGoingReq.concat(action.friendId);

            return {
                ...state,
                allJumlages: updatedJumlageReq
            }

        case JUMLAGE_CANCEL_REQUEST:
            const cancled_Indx = state.allJumlages.findIndex(u => u.userRef === action.friendId);
            const my_indx = state.allJumlages.findIndex(u => u.userRef === action.userId);
            const updatedCancelJum = [...state.allJumlages];
            // remove other user from outGoingReq list of logged user
            updatedCancelJum[my_indx].outGoingReq = updatedCancelJum[my_indx].outGoingReq.filter(u => u !== action.friendId)


            // remove loggedin user from incominreq list of other user
            updatedCancelJum[cancled_Indx].inCommingReq = updatedCancelJum[cancled_Indx].inCommingReq.filter(u => u !== action.userId)

            return {
                ...state,
                allJumlages: updatedCancelJum
            }


        case ACCEPT_JUMLAGE:
            const his_indxx = state.allJumlages.findIndex(u => u.userRef === action.friendId);
            const mine_indx = state.allJumlages.findIndex(u => u.userRef === action.userId);
            const updatedJumlagedUsers = [...state.allJumlages];
            // add other user as my player2 and remove it from my inComming list and my status became true
            updatedJumlagedUsers[mine_indx].inCommingReq = updatedJumlagedUsers[mine_indx].inCommingReq.filter(u => u !== action.friendId);
            updatedJumlagedUsers[mine_indx].player2 = action.friendId;
            updatedJumlagedUsers[mine_indx].status = true;


            // add me as his player2 and remove me from his outGoingReq
            updatedJumlagedUsers[his_indxx].outGoingReq = updatedJumlagedUsers[his_indxx].outGoingReq.filter(u => u !== action.userId);
            updatedJumlagedUsers[his_indxx].player2 = action.userId;
            updatedJumlagedUsers[his_indxx].status = true;
            return {
                ...state,
                allJumlages: updatedJumlagedUsers
            }


        case DECLINE_JUMLAGE:
            const hishis = state.allJumlages.findIndex(u => u.userRef === action.friendId);
            const meme = state.allJumlages.findIndex(u => u.userRef === action.userId);
            const updatedDeclineJumUsers = [...state.allJumlages];
            //  remove him from my inComming list
            updatedDeclineJumUsers[meme].inCommingReq = updatedDeclineJumUsers[meme].inCommingReq.filter(u => u !== action.friendId);
            // remove me from his outGoingReq list
            updatedDeclineJumUsers[hishis].outGoingReq = updatedDeclineJumUsers[hishis].outGoingReq.filter(u => u !== action.userId);

            return {
                ...state,
                allJumlages: updatedDeclineJumUsers
            }

        case DELETE_JUMLAGE:
            const hes_player2 = state.allJumlages.findIndex(u => u.userRef === action.friendId);
            const im_player2 = state.allJumlages.findIndex(u => u.userRef === action.userId);
            const updatedDeletedJum = [...state.allJumlages];
            //  remove player2 from my tab and i will no longer be his player2 and makes our status false :'(
            updatedDeletedJum[im_player2].player2 = {};
            updatedDeletedJum[hes_player2].player2 = {};
            updatedDeletedJum[im_player2].status = false;
            updatedDeletedJum[hes_player2].status = false;

            return {
                ...state,
                allJumlages: updatedDeletedJum
            }






        //media acces _______________________________________________
        case ACCESS_ALBUM_4EVER:
            const albmIndx = state.allAlbums.findIndex(u => u.userRef === action.myId);
            const updatedAlbum = [...state.allAlbums];
            // add him in my athorized list
            updatedAlbum[albmIndx].authorized = updatedAlbum[albmIndx].authorized.concat(action.friendId);

            return {
                ...state,
                allAlbums: updatedAlbum
            }

        case ACCESS_ALBUM_24H:
            const albmIdx = state.allAlbums.findIndex(u => u.userRef === action.myId);
            const updatedOneDayAlbum = [...state.allAlbums];
            // add him in my athorizedone list 
            updatedOneDayAlbum[albmIdx].authorizedone = updatedOneDayAlbum[albmIdx].authorizedone.concat(action.friendId);

            return {
                ...state,
                allAlbums: updatedOneDayAlbum
            }

        case ACCESS_ALBUM_48H:
            const albmmIdx = state.allAlbums.findIndex(u => u.userRef === action.myId);
            const updatedTwoDayAlbum = [...state.allAlbums];
            // add him in my athorizedtwo list 
            updatedTwoDayAlbum[albmmIdx].authorizedtwo = updatedTwoDayAlbum[albmmIdx].authorizedtwo.concat(action.friendId);

            return {
                ...state,
                allAlbums: updatedTwoDayAlbum
            }

        case DELETE_ACCESS:
            const alIndxxx = state.allAlbums.findIndex(u => u.userRef === action.myId);
            const updatedCancelAccesAlbum = [...state.allAlbums];
            // remove him from all the lists 
            updatedCancelAccesAlbum[alIndxxx].authorized = updatedCancelAccesAlbum[alIndxxx].authorized.filter(u => u !== action.friendId);
            updatedCancelAccesAlbum[alIndxxx].authorizedone = updatedCancelAccesAlbum[alIndxxx].authorizedone.filter(u => u !== action.friendId);
            updatedCancelAccesAlbum[alIndxxx].authorizedtwo = updatedCancelAccesAlbum[alIndxxx].authorizedtwo.filter(u => u !== action.friendId);

            return {
                ...state,
                allAlbums: updatedCancelAccesAlbum
            }












        case SET_FIND_PEOPLE:
            return {
                ...state,
                findPeople: action.users
            }

        case FOLLOW_FIND_PEOPLE:
            let updatedFindPeople = [...state.findPeople];
            updatedFindPeople = updatedFindPeople.filter(i => i._id !== action.userId)

            console.log(updatedFindPeople);
            return {
                ...state,
                findPeople: updatedFindPeople
            }

        case UPDATE_USER:
            const index = state.allUsers.findIndex(user => user._id === action.userUpdatedData._id);
            const updatedAllUsers = [...state.allUsers]
            delete action.userUpdatedData.photo;
            updatedAllUsers[index] = action.userUpdatedData;
            console.log(updatedAllUsers[index]);
            return {
                ...state,
                token: action.token,
                user: action.user,
                didTryAutoLogin: true,
                allUsers: updatedAllUsers
            }


        case ONLINE_USER:
            const onlIndx = state.allUsers.findIndex(user => user._id === action.userId);
            const updatedOnlineUsers = [...state.allUsers]
            updatedOnlineUsers[onlIndx].status = true;

            return {
                ...state,
                allUsers: updatedOnlineUsers
            }

        case OFFLINE_USER:
            const offIndx = state.allUsers.findIndex(user => user._id === action.userId);
            const updatedOfflineUsers = [...state.allUsers]
            updatedOfflineUsers[offIndx].status = false;


            return {
                ...state,
                allUsers: updatedOfflineUsers
            }


        default:
            return state;
    }
}