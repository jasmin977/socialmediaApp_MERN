import ENV from '../../env';

export const DELETE_POST = "DELETE_POST";
export const CREATE_POST = "CREATE_POST";
export const CREATE_STATUS = "CREATE_STATUS";

export const UPDATE_POST = "UPDATE_POST";
export const SET_POSTS = 'SET_POSTS';
export const SET_MEDIA = 'SET_MEDIA';

export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const COMMENT_POST = 'COMMENT_POST';
export const UNCOMMENT_POST = 'UNCOMMENT_POST';
export const ADD_COMMENT_TEMP = 'ADD_COMMENT_TEMP';
export const COUP_DE_COEUR = 'COUP_DE_COEUR';
export const ACCEPT_COUP_DE_COEUR = 'ACCEPT_COUP_DE_COEUR';
export const DECLINE_COUP_DE_COEUR = 'DECLINE_COUP_DE_COEUR';

import Colors from '../../constants/Colors';

import { showMessage } from "react-native-flash-message";

export const fetchPosts = () => {
    return async (dispatch, getState) => {
        const response = await fetch(`${ENV.apiUrl}/rn/allposts`);

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        // console.log(resData);
        dispatch({
            type: SET_POSTS,
            posts: resData
        })
    }
};


export const fetchMedia = () => {
    return async (dispatch, getState) => {
        const response = await fetch(`${ENV.apiUrl}/rn/allmedia`);

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        // console.log(resData);
        dispatch({
            type: SET_MEDIA,
            images: resData
        })
    }
};



export const createPost = (body, tags, privacy, pickedImages) => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const postData = { body, tags, privacy }
        // console.log(JSON.stringify(postData))
        // any async code
        const response = await fetch(`${ENV.apiUrl}/rn/post/new/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        //  console.log(resData._id)



        for (let i = 0; i < pickedImages.length; i++) {

            const base64Data = pickedImages[i].base64;
            const imageType = pickedImages[i].imageType;
            const imageData = { base64Data, imageType }
            const imageRes = await fetch(`${ENV.apiUrl}/rn/post/new/image/${resData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(imageData)
            });
            const resDataImage = await imageRes.json();
            if (resDataImage.error) {
                throw new Error(resDataImage.error);
            }


        }




        //  console.log(resData._id)





        dispatch({
            type: CREATE_POST,
            postData: {
                _id: resData._id,
                body: resData.body,
                privacy: resData.privacy,
                mediaRef: resData.mediaRef,
                tags: resData.tags,
                requested: resData.requested,
                authorized: resData.authorized,
                comments: resData.comments,
                created: new Date(resData.created),
                likes: resData.likes,
                postedBy: {
                    _id: resData.postedBy._id,
                    username: resData.postedBy.username
                }
            }
        });


    }
};









export const importImages = (pickedImages) => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;

        const base64Data = pickedImages[0].base64;
        const imageType = pickedImages[0].imageType;

        const imageData = { base64Data, imageType }
        const response = await fetch(`${ENV.apiUrl}/rn/post/new/image/60b6396c4b877b455cea0aad`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(imageData)
        });
        console.log('5lat')
        const resDataImage = await response.json();
        if (resDataImage.error) {
            throw new Error(resDataImage.error);
        }

        console.log(resDataImage)







    }
};




















export const createStatus = (body, tags) => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const statusData = { body, tags }
        // console.log(JSON.stringify(statusData))
        // any async code
        const response = await fetch(`${ENV.apiUrl}/rn/post/new/nophoto/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(statusData)
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
        dispatch({
            type: CREATE_STATUS,
            statusData: {
                _id: resData._id,
                body: resData.body,
                tags: resData.tags,
                mediaRef: resData.mediaRef,
                privacy: resData.privacy,
                requested: resData.requested,
                authorized: resData.authorized,
                comments: resData.comments,
                created: new Date(resData.created),
                likes: resData.likes,
                postedBy: {
                    _id: resData.postedBy._id,
                    username: resData.postedBy.username
                }
            }
        });


    }
};


export const deletePost = (postId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`${ENV.apiUrl}/post/${postId}`, {
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
            type: DELETE_POST,
            pid: postId
        })
    }
};


export const updatePost = (postId, privacy, body, tags, famaPhotos) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        let postData;
        // const userId = getState().auth.user._id;
        if (famaPhotos.length === 0) {
            postData = { body, tags }
        } else {
            postData = { body, privacy, tags }
        }
        const response = await fetch(`${ENV.apiUrl}/rn/post/${postId}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
        //console.log('ba3d lupdate')
        dispatch({
            type: UPDATE_POST,
            updatedPostData: {
                _id: resData._id,

                body: resData.body,
                tags: resData.tags,
                comments: resData.comments,
                created: new Date(resData.created),
                mediaRef: resData.mediaRef,

                likes: resData.likes,
                authorized: resData.authorized,
                requested: resData.requested,
                privacy: resData.privacy,
                visible: resData.visible,
                postedBy: {
                    _id: resData.postedBy._id,
                    username: resData.postedBy.username
                },
                updated: new Date(resData.updated)
            }
        });
    }
};


export const likePost = (postId, friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const posts = getState().posts.allPosts;
        // console.log(posts.length)
        const index = posts.findIndex(p => p._id === postId)
        if (posts[index].likes.indexOf(userId) === -1) {
            dispatch({
                type: LIKE_POST,
                userId: userId,
                postId: postId
            });

            const response = await fetch(`${ENV.apiUrl}/post/like`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, postId, friendId })
            });
            const resData = await response.json();
            // console.log(resData)
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};


export const unlikePost = (postId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;

        dispatch({
            type: UNLIKE_POST,
            userId: userId,
            postId: postId
        });
        const response = await fetch(`${ENV.apiUrl}/post/unlike`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, postId })
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
    }
};


export const commentPost = (postId, text, friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const userName = getState().auth.user.username;

        const comment = { text };

        // dispatch({
        //     type: ADD_COMMENT_TEMP,
        //     postId: postId,
        //     comment: {
        //         text: text,
        //         postedBy: {
        //             _id: userId,
        //             username: userName
        //         },
        //         created: new Date()
        //     }
        // });

        const response = await fetch(`${ENV.apiUrl}/post/comment`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, postId, comment, friendId })
            // user id howa el user connectee ,wel friend id howa moula el posteli bech temchilou notif
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
        dispatch({
            type: COMMENT_POST,
            postId: postId,
            comments: resData.comments
        });
    }
};

export const heartRequest = (postId, friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const posts = getState().posts.allPosts;
        const index = posts.findIndex(p => p._id === postId)
        if (posts[index].requested.indexOf(userId) === -1) {
            dispatch({
                type: COUP_DE_COEUR,
                userId: userId,
                postId: postId
            });

            const response = await fetch(`${ENV.apiUrl}/sendheart`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, postId, friendId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
        showMessage({
            message: "Heart Request Sent.",
            type: "default",
            duration: 3000,
            icon: { icon: "success", position: 'left', color: 'black' },
            backgroundColor: Colors.gold, // background color
            color: 'black', // text color
        });
    }
};


export const acceptCoupDeCoeur = (postId, friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const posts = getState().posts.allPosts;
        const index = posts.findIndex(p => p._id === postId)
        if (posts[index].authorized.indexOf(friendId) === -1) {
            dispatch({
                type: ACCEPT_COUP_DE_COEUR,
                userId: friendId,
                postId: postId
            });


            const response = await fetch(`${ENV.apiUrl}/acceptheart`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ postId, friendId, userId })
            });

            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }

    }
};

export const declineCoupDeCoeur = (postId, friendId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;

        dispatch({
            type: DECLINE_COUP_DE_COEUR,
            userId: friendId,
            postId: postId
        });

        const response = await fetch(`${ENV.apiUrl}/declineheart`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ postId, friendId })
        });

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

    }
};


export const uncommentPost = (postId, comment) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;

        dispatch({
            type: UNCOMMENT_POST,
            postId: postId,
            commentId: comment._id
        });

        const response = await fetch(`${ENV.apiUrl}/post/uncomment`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, postId, comment })
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
    }
};




