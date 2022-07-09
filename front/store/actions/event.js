import ENV from '../../env';

export const DELETE_EVENT = "DELETE_EVENT";
export const CREATE_EVENT = "CREATE_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const SET_EVENTS = 'SET_EVENTS';
export const LIKE_EVENT = 'LIKE_EVENT';
export const UNLIKE_EVENT = 'UNLIKE_EVENT';
export const COMMENT_EVENT = 'COMMENT_EVENT';
export const UNCOMMENT_EVENT = 'UNCOMMENT_EVENT';
export const ADD_COMMENT_TEMP = 'ADD_COMMENT_TEMP';
export const PARTICIPATE_EVENT = 'PARTICIPATE_EVENT';
export const UNPARTICIPATE_EVENT = 'UNPARTICIPATE_EVENT';
export const SET_PARTICIPANTS = 'SET_PARTICIPANTS';

export const INVITE = 'INVITE';

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const fetchParticipants = () => {
    return async (dispatch, getState) => {
        const response = await fetch(`${ENV.apiUrl}/rn/allparicipants`);

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        // console.log(resData[0]);
        dispatch({
            type: SET_PARTICIPANTS,
            participants: resData
        })
    }
};

export const fetchCategories = () => {
    return async (dispatch, getState) => {
        const response = await fetch(`${ENV.apiUrl}/category`);

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        // console.log(resData[0]);
        dispatch({
            type: SET_CATEGORIES,
            categories: resData
        })
    }
};


export const fetchEvents = () => {
    return async (dispatch, getState) => {
        const response = await fetch(`${ENV.apiUrl}/rn/allevents`);

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        // console.log(resData[0]);
        dispatch({
            type: SET_EVENTS,
            events: resData
        })
    }
};

//actions and reducers


export const createEvent = (title, place, description, date, starttime, endtime, category, base64Data, imageType) => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const users = getState().users.allUsers;
        const myIndex = users.findIndex(u => u._id === userId)
        const eventData = { title, place, description, date, starttime, endtime, category, base64Data, imageType }
        // console.log(JSON.stringify(eventData))
        // any async code
        const response = await fetch(`${ENV.apiUrl}/rn/event/new/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(eventData)
        });

        const resData = await response.json();
        console.log(resData);
        if (resData.error) {
            throw new Error(resData.error);
        }


        dispatch({
            type: CREATE_EVENT,
            eventData: {

                _id: resData._id,
                title: resData.title,
                place: resData.place,
                description: resData.description,
                date: resData.date,
                starttime: resData.starttime,
                endtime: resData.endtime,
                category: resData.category,
                created: new Date(resData.created),
                photo: {
                    data: resData.base64Data,
                    contentType: resData.imageType
                },
                postedBy: {
                    _id: resData.postedBy._id,
                    username: resData.postedBy.username
                }
            }
        });

    }
};


export const deleteEvent = (eventId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`${ENV.apiUrl}/event/${eventId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
        dispatch({
            type: DELETE_EVENT,
            pid: eventId
        })
    }
};



export const updateEvent = (eventId, title, place, description, date, starttime, endtime, category, base64Data, imageType) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        let eventData;
        const userId = getState().auth.user._id;
        if (!base64Data || !imageType || (base64Data === '' && imageType === '')) {
            eventData = { title, place, description, date, starttime, endtime, category }
        } else {
            eventData = { title, place, description, date, starttime, endtime, category, base64Data, imageType }
        }
        const response = await fetch(`${ENV.apiUrl}/rn/event/${eventId}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(eventData)
        });
        const resData = await response.json();
        console.log(resData)
        if (resData.error) {
            throw new Error(resData.error);
        }
        dispatch({
            type: UPDATE_EVENT,
            updatedEventData: {
                _id: resData._id,
                title: resData.title,
                place: resData.place,
                description: resData.description,
                date: resData.date,
                starttime: resData.starttime,
                endtime: resData.endtime,
                category: resData.category,
                postedBy: {
                    _id: resData.postedBy._id,
                    username: resData.postedBy.username
                },
                photo: {
                    data: resData.base64Data,
                    contentType: resData.imageType
                },

                updated: new Date(resData.updated),
                created: new Date(resData.created),
            }
        });
    }
};



export const participate = (eventId, friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const allParts = getState().events.allParticipants;

        const index = allParts.findIndex(p => p.refevent === eventId)

        if (allParts[index].parts.indexOf(userId) === -1) {
            dispatch({
                type: PARTICIPATE_EVENT,
                userId: userId,
                eventId: eventId

            });

            const response = await fetch(`${ENV.apiUrl}/paricipants/add`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ eventId, userId, friendId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }

    };
}


export const unParticipate = (eventId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;

        dispatch({
            type: UNPARTICIPATE_EVENT,
            userId: userId,
            eventId: eventId

        });

        const response = await fetch(`${ENV.apiUrl}/paricipants/remove`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ eventId, userId })
        });
        const resData = await response.json();

        if (resData.error) {
            throw new Error(resData.error);
        }
    }
};

export const likeEvent = (eventId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const events = getState().events.allEvents;
        const index = events.findIndex(e => e._id === eventId)
        if (events[index].likes.indexOf(userId) === -1) {
            dispatch({
                type: LIKE_POST,
                userId: userId,
                eventId: eventId
            });

            const response = await fetch(`${ENV.apiUrl}/event/like`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, eventId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};


export const unlikeEvent = (eventId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;

        dispatch({
            type: UNLIKE_EVENT,
            userId: userId,
            eventId: eventId
        });
        const response = await fetch(`${ENV.apiUrl}/event/unlike`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, eventId })
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
    }
};




export const inviteToMyEvent = (eventId, friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const allevents = getState().events.allEvents;

        const index = allevents.findIndex(p => p._id === eventId)

        if (allevents[index].invitedUsers.indexOf(friendId) === -1) {
            dispatch({
                type: INVITE,
                friendId: friendId,
                eventId: eventId
            });
            const response = await fetch(`${ENV.apiUrl}/cha3maltou/5bebil`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, eventId, friendId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};
