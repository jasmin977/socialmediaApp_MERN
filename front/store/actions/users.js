import ENV from '../../env';

export const SET_USERS = 'SET_USERS';
import { AsyncStorage } from 'react-native';
import { showMessage } from "react-native-flash-message";
import { useSelector } from 'react-redux';

export const LOGOUT = 'LOGOUT';

export const UPDATE_USER = 'UPDATE_USER';

export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_FIND_PEOPLE = 'SET_FIND_PEOPLE';

export const FOLLOW_FIND_PEOPLE = 'FOLLOW_FIND_PEOPLE';
export const SET_FRIENDS = 'SET_FRIENDS';
export const SET_ALBUM = 'SET_ALBUM';
export const SET_JUMLAGES = 'SET_JUMLAGES';
export const SET_PLACES = 'SET_PLACES';


// nearby users 
export const SET_PEOPLE_LOCATION = 'SET_PEOPLE_LOCATION';


//online / offline
export const ONLINE_USER = 'ONLINE_USER';
export const OFFLINE_USER = 'OFFLINE_USER';



// friends
export const FRIEND_REQUEST = 'FRIEND_REQUEST';
export const FRIEND_CANCEL_REQUEST = 'FRIEND_CANCEL_REQUEST';


export const ACCEPT_REQUEST = 'ACCEPT_REQUEST';
export const DECLINE_REQUEST = 'DECLINE_REQUEST';

export const BLOCK_FRIEND = 'BLOCK_FRIEND';
export const UNBLOCK_FRIEND = 'UNBLOCK_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';


// album acces
export const ACCESS_ALBUM_4EVER = 'ACCESS_ALBUM_4EVER';
export const ACCESS_ALBUM_24H = 'ACCESS_ALBUM_24H';
export const ACCESS_ALBUM_48H = 'ACCESS_ALBUM_48H';
export const DELETE_ACCESS = 'DELETE_ACCESS';





// jumlage
export const JUMLAGE_REQUEST = 'JUMLAGE_REQUEST';
export const JUMLAGE_CANCEL_REQUEST = 'JUMLAGE_CANCEL_REQUEST';
export const ACCEPT_JUMLAGE = 'ACCEPT_JUMLAGE';
export const DECLINE_JUMLAGE = 'DECLINE_JUMLAGE';
export const DELETE_JUMLAGE = 'DELETE_JUMLAGE';






export const fetchMyFriend = () => {
    return async (dispatch, getState) => {

        const userId = getState().auth.user._id;
        const response = await fetch(`${ENV.apiUrl}/friends`);

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        dispatch({
            type: SET_FRIENDS,
            friends: resData
        })
    }
};





export const fetchMyAlbum = () => {
    return async (dispatch, getState) => {

        const userId = getState().auth.user._id;
        const response = await fetch(`${ENV.apiUrl}/albums`);

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        dispatch({
            type: SET_ALBUM,
            albums: resData
        })
    }
};







export const fetchMyFriends = () => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const userId = getState().auth.user._id;

        const response = await fetch(`${ENV.apiUrl}/onefriend/${userId}`);
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
        console.log(resData)


    }

};



export const fetchUsers = () => {
    return async (dispatch, getState) => {
        const response = await fetch(`${ENV.apiUrl}/users`);

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        dispatch({
            type: SET_USERS,
            users: resData
        })
    }
};



export const fetchJumelages = () => {
    return async (dispatch, getState) => {
        const response = await fetch(`${ENV.apiUrl}/jumlages`);

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
        dispatch({
            type: SET_JUMLAGES,
            jumlages: resData
        })


    }
};


export const fetchLocations = () => {
    return async (dispatch, getState) => {
        const response = await fetch(`${ENV.apiUrl}/locations`);

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
        dispatch({
            type: SET_PLACES,
            places: resData
        })


    }
};


export const getLocation = (alt, long) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const response = await fetch(`${ENV.apiUrl}/updatelocation`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, alt, long })
        });

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
    }
};





export const fetchFindPeopleUsers = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const loggedUserId = getState().auth.user._id

        const response = await fetch(`${ENV.apiUrl}/user/findpeople/${loggedUserId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        dispatch({
            type: SET_FIND_PEOPLE,
            users: resData
        })

        return resData;
    }
};
const saveDataToStorage = (token, user) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        user,

    }));
}




export const updateProfile = (FirstName, LastName, username, email, about, phoneNumber, BirthDate, Gender, relationship, interests, base64Data, imageType) => {
    return async (dispatch, getState) => {


        const token = getState().auth.token;
        const userInfo = getState().auth.user;



        const complete = true;
        const user = { _id: userInfo._id, email: userInfo.email, username: userInfo.username, complete: true };

        const loggedUserId = getState().auth.user._id;

        let userData;
        if (base64Data !== '' && imageType !== '' && FirstName === '' && LastName === '' && username === '' && email === '' && about === '' && phoneNumber === '' && BirthDate === '' && Gender === '' && relationship === '' && interests === '') {
            userData = { base64Data, imageType }

        }
        else if (phoneNumber === '') {
            userData = { FirstName, LastName, username, email, about, BirthDate, Gender, relationship, interests, base64Data, imageType }

        }

        else if (!base64Data || !imageType || (base64Data === '' && imageType === '')) {
            userData = { FirstName, LastName, username, email, about, phoneNumber, BirthDate, Gender, relationship, interests }
        } else if ((base64Data !== '' && imageType !== '')) {
            userData = { FirstName, LastName, username, email, about, phoneNumber, BirthDate, Gender, relationship, interests, base64Data, imageType }
        }

        const response = await fetch(`${ENV.apiUrl}/rn/user/${loggedUserId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        })

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
        saveDataToStorage(token, user);

        dispatch({
            type: UPDATE_USER,
            userUpdatedData: resData,
            user: user,
            token: token,

        })



        // console.log(token, user,)
    }
};





export const changePassword = (password, newpass1, newpass2) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const loggedUserId = getState().auth.user._id;
        const response = await fetch(`${ENV.apiUrl}/changepassword/${loggedUserId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                password,
                newpass1,
                newpass2,
            })
        });
        const resData = await response.json();

        if (resData.error) {
            throw new Error(resData.error);
        }

    };
};


export const desactivation = (password) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const loggedUserId = getState().auth.user._id;
        const response = await fetch(`${ENV.apiUrl}/user/deactivateAccount/${loggedUserId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                password,

            })
        });
        const resData = await response.json();

        if (resData.error) {
            throw new Error(resData.error);
        }

        if (resData.makhtafch) {
            showMessage({
                message: 'password is incorrect. try again.',
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
        }


        if (resData.khtaf) {
            showMessage({
                message: "Account deactivated. Login again to activate it.",
                type: "success",
                duration: 3000,
                icon: { icon: "success", position: 'left' }
            });
            AsyncStorage.removeItem('userData');
            dispatch({
                type: LOGOUT,

            })
        }

    };
};


export const deleteaccount = (password) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const loggedUserId = getState().auth.user._id;
        const response = await fetch(`${ENV.apiUrl}/user/delete/${loggedUserId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                password,

            })
        });
        const resData = await response.json();

        if (resData.error) {
            throw new Error(resData.error);
        }

    };
};





// friends actions

export const sendRequest = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const amis = getState().friends.myFriends;
        const myIndx = amis.findIndex(f => f.userRef === userId)

        if (amis[myIndx].outGoingReq.indexOf(friendId) === -1) {
            dispatch({
                type: FRIEND_REQUEST,
                userId: userId,
                friendId: friendId
            });


            const response = await fetch(`${ENV.apiUrl}/user/sendrequest`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, friendId })
            });

            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};

export const cancelRequest = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const amis = getState().friends.myFriends;
        const myIdx = amis.findIndex(f => f.userRef === userId)

        if (amis[myIdx].outGoingReq.indexOf(friendId) != -1) {
            dispatch({
                type: FRIEND_CANCEL_REQUEST,
                userId: userId,
                friendId: friendId
            });

            const response = await fetch(`${ENV.apiUrl}/user/cancelrequest`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, friendId })
            });

            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};


export const acceptRequest = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const amis = getState().friends.myFriends;
        const myIndx = amis.findIndex(f => f.userRef === userId)

        if (amis[myIndx].friends.indexOf(friendId) === -1) {
            dispatch({
                type: ACCEPT_REQUEST,
                userId: userId,
                friendId: friendId
            });



            const response = await fetch(`${ENV.apiUrl}/user/acceptrequest`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, friendId })
            });

            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};

export const declineRequest = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        dispatch({
            type: DECLINE_REQUEST,
            userId: userId,
            friendId: friendId
        });


        const response = await fetch(`${ENV.apiUrl}/user/declinerequest`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, friendId })
        });

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

    }
};


export const removefriend = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        dispatch({
            type: REMOVE_FRIEND,
            userId: userId,
            friendId: friendId
        });


        const response = await fetch(`${ENV.apiUrl}/user/removefriend`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, friendId })
        });

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

    }
};

export const blockFriend = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const amis = getState().friends.myFriends;
        const myIndx = amis.findIndex(f => f.userRef === userId)

        if (amis[myIndx].blocked.indexOf(friendId) === -1) {
            dispatch({
                type: BLOCK_FRIEND,
                userId: userId,
                friendId: friendId
            });


            const response = await fetch(`${ENV.apiUrl}/user/blockfriend`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, friendId })
            });


            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};

export const unblockFriend = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const amis = getState().friends.myFriends;
        const myIndx = amis.findIndex(f => f.userRef === userId)

        if (amis[myIndx].blocked.indexOf(friendId) != -1) {
            dispatch({
                type: UNBLOCK_FRIEND,
                userId: userId,
                friendId: friendId
            });

            const response = await fetch(`${ENV.apiUrl}/user/unblockfriend`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, friendId })
            });


            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};





// jumlages actions

export const jumlageRequest = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const jumlages = getState().jumlages.allJumlages;
        const myIndx = jumlages.findIndex(f => f.userRef === userId)

        if (jumlages[myIndx].outGoingReq.indexOf(friendId) === -1) {
            dispatch({
                type: JUMLAGE_REQUEST,
                userId: userId,
                friendId: friendId
            });


            const response = await fetch(`${ENV.apiUrl}/user/jumlage/request`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, friendId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};

export const jumlageCancelRequest = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const jumlages = getState().jumlages.allJumlages;
        const myIdx = jumlages.findIndex(f => f.userRef === userId)

        if (jumlages[myIdx].outGoingReq.indexOf(friendId) != -1) {
            dispatch({
                type: JUMLAGE_CANCEL_REQUEST,
                userId: userId,
                friendId: friendId
            });

            const response = await fetch(`${ENV.apiUrl}/user/jumlage/cancelrequest`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, friendId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};

export const jumlageAccept = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const jumlages = getState().jumlages.allJumlages;
        const myIndx = jumlages.findIndex(f => f.userRef === userId)


        dispatch({
            type: ACCEPT_JUMLAGE,
            userId: userId,
            friendId: friendId
        });

        const response = await fetch(`${ENV.apiUrl}/user/jumlage/accept`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, friendId })
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

    }
};

export const jumlageDeclineRequest = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        dispatch({
            type: DECLINE_JUMLAGE,
            userId: userId,
            friendId: friendId
        });
        const response = await fetch(`${ENV.apiUrl}/user/jumlage/declinerequest`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, friendId })
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
    }
};

export const deleteJumlage = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        dispatch({
            type: DELETE_JUMLAGE,
            userId: userId,
            friendId: friendId
        });

        const response = await fetch(`${ENV.apiUrl}/user/jumlage/delete`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, friendId })
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
    }
};






// access media

export const albumAccesForever = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        //check kenou mawjood fi one of the three authorized lists
        dispatch({
            type: ACCESS_ALBUM_4EVER,
            friendId: friendId,
            myId: userId,
        });
        const response = await fetch(`${ENV.apiUrl}/accesmedia`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, friendId })
        });

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

    }
};
export const albumAccesForOneDay = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;

        dispatch({
            type: ACCESS_ALBUM_24H,
            friendId: friendId,
            myId: userId,
        });
        const response = await fetch(`${ENV.apiUrl}/accesmediaOne`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, friendId })
        });

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

    }
};
export const albumAccesForTwoDay = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        dispatch({
            type: ACCESS_ALBUM_48H,
            friendId: friendId,
            myId: userId,
        });
        const response = await fetch(`${ENV.apiUrl}/accesmediaTwo`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, friendId })
        });

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

    }
};


export const deleteAccess = (friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        //check kenou mawjood fi one of the three authorized lists
        dispatch({
            type: DELETE_ACCESS,
            friendId: friendId,
            myId: userId,
        });
        const response = await fetch(`${ENV.apiUrl}/deleteAcces`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, friendId })
        });

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

    }
};



// online offline
export const online = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const users = getState().users.allUsers;
        const userIndx = users.findIndex(u => u._id === userId)
        if (users[userIndx].status === false) {
            dispatch({
                type: ONLINE_USER,
                userId: userId,
            });

            const response = await fetch(`${ENV.apiUrl}/user/online`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};
export const offline = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const users = getState().users.allUsers;
        const userIndx = users.findIndex(u => u._id === userId)
        if (users[userIndx].status === true) {
            dispatch({
                type: OFFLINE_USER,
                userId: userId,
            });

            const response = await fetch(`${ENV.apiUrl}/user/offline`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};



export const deleteProfilPic = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;



        const response = await fetch(`${ENV.apiUrl}/user/deleteprofilepic/${userId}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId })
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

    }
};