import ENV from '../../env';

export const DELETE_STORY = "DELETE_STORY";
export const CREATE_STORY = "CREATE_STORY";
export const SET_STORIES = 'SET_STORIES';
export const SET_ARCHIVE = 'SET_ARCHIVE';
export const VIEW_STORY = 'VIEW_STORY';


export const fetchStories = () => {
    return async (dispatch, getState) => {
        const response = await fetch(`${ENV.apiUrl}/rn/allstories`);

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        //  console.log(resData[0]);
        dispatch({
            type: SET_STORIES,
            stories: resData
        })
    }
};
export const fetchArchive = () => {
    return async (dispatch, getState) => {
        const response = await fetch(`${ENV.apiUrl}/rn/allarchives`);

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        dispatch({
            type: SET_ARCHIVE,
            archives: resData
        })
    }
};


export const createStoryRn = (base64Data, imageType) => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const storyData = { base64Data, imageType }
        // console.log(storyData.imageType)
        const response = await fetch(`${ENV.apiUrl}/rn/story/new/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(storyData)
        });


        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        dispatch({
            type: CREATE_STORY,
            storyData: {
                _id: resData._id,
                created: new Date(resData.created),
                postedBy: {
                    _id: userId,
                    username: resData.postedBy.username
                },
                photo: {
                    data: resData.base64Data,
                    "Content-Type": resData.imageType
                },
            }
        });

    }
};

export const deleteStory = (storyId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`${ENV.apiUrl}/story/${storyId}`, {
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
            type: DELETE_STORY,
            pid: storyId
        })
    }
};

export const viewStory = (index) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const stories = getState().stories.allStories;


        const storyId = stories[index]._id;
        const storyowner = stories[index].postedBy._id;


        if (stories[index].views.indexOf(userId) === -1 && storyowner != userId) {
            console.log("before")
            dispatch({
                type: VIEW_STORY,
                userId: userId,
                storyId: storyId
            });

            const response = await fetch(`${ENV.apiUrl}/5bebil/view`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, storyId })
            });


            const resData = await response.json();

            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};

