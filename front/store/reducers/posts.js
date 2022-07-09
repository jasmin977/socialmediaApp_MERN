import { SET_POSTS, SET_MEDIA, CREATE_STATUS, COUP_DE_COEUR, ACCEPT_COUP_DE_COEUR, DECLINE_COUP_DE_COEUR, CREATE_POST, DELETE_POST, UPDATE_POST, LIKE_POST, UNLIKE_POST, COMMENT_POST, UNCOMMENT_POST, ADD_COMMENT_TEMP } from "../actions/posts";

const initialState = {
    allPosts: [],
    allImages: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                allPosts: action.posts
            }

        case SET_MEDIA:
            return {
                ...state,
                allImages: action.images
            }


        case CREATE_POST:
            return {
                ...state,
                allPosts: [action.postData, ...state.allPosts]
            }
        case CREATE_STATUS:
            return {
                ...state,
                allPosts: [action.statusData, ...state.allPosts]
            }


        case UPDATE_POST:
            const postIndex = state.allPosts.findIndex(post => post._id === action.updatedPostData._id);
            const updatedAllPosts = [...state.allPosts];
            updatedAllPosts[postIndex] = action.updatedPostData;
            return {
                ...state,
                allPosts: updatedAllPosts
            }

        case DELETE_POST:
            return {
                ...state,
                allPosts: state.allPosts.filter(post => post._id !== action.pid)
            }

        case LIKE_POST:
            const pIndex = state.allPosts.findIndex(post => post._id === action.postId);
            const updatedLikePosts = [...state.allPosts];
            if (updatedLikePosts[pIndex].likes.indexOf(action.userId) === -1) {
                updatedLikePosts[pIndex].likes = updatedLikePosts[pIndex].likes.concat(action.userId);
            }
            return {
                ...state,
                allPosts: updatedLikePosts
            }



        case UNLIKE_POST:
            const pInd = state.allPosts.findIndex(post => post._id === action.postId);
            const updatedUnlikePosts = [...state.allPosts];
            updatedUnlikePosts[pInd].likes = updatedUnlikePosts[pInd].likes.filter(x => x !== action.userId);
            return {
                ...state,
                allPosts: updatedUnlikePosts
            }


        case COUP_DE_COEUR:
            const cIndex = state.allPosts.findIndex(post => post._id === action.postId);
            const updatedRequestPosts = [...state.allPosts];
            if (updatedRequestPosts[cIndex].requested.indexOf(action.userId) === -1) {
                updatedRequestPosts[cIndex].requested = updatedRequestPosts[cIndex].requested.concat(action.userId);
            }
            return {
                ...state,
                allPosts: updatedRequestPosts
            }


        case ACCEPT_COUP_DE_COEUR:
            const acpIndex = state.allPosts.findIndex(post => post._id === action.postId);
            const updatedAuthorisedPosts = [...state.allPosts];
            if (updatedAuthorisedPosts[acpIndex].authorized.indexOf(action.userId) === -1) {
                updatedAuthorisedPosts[acpIndex].requested = updatedAuthorisedPosts[acpIndex].requested.filter(x => x !== action.userId);
                updatedAuthorisedPosts[acpIndex].authorized = updatedAuthorisedPosts[acpIndex].authorized.concat(action.userId);
            }
            return {
                ...state,
                allPosts: updatedAuthorisedPosts
            }

        case DECLINE_COUP_DE_COEUR:
            const pInx = state.allPosts.findIndex(post => post._id === action.postId);
            const updatedDeclineHeartPosts = [...state.allPosts];
            if (updatedDeclineHeartPosts[pInx].requested.indexOf(action.userId) === -1) {
                updatedDeclineHeartPosts[pInx].requested = updatedDeclineHeartPosts[pInx].requested.filter(x => x !== action.userId);
            }
            return {
                ...state,
                allPosts: updatedDeclineHeartPosts
            }




        case COMMENT_POST:
            const index = state.allPosts.findIndex(post => post._id === action.postId);
            const updatedCommentPosts = [...state.allPosts];
            updatedCommentPosts[index].comments = action.comments;
            return {
                ...state,
                allPosts: updatedCommentPosts
            }

        case UNCOMMENT_POST:
            const indx = state.allPosts.findIndex(post => post._id === action.postId);
            const updatedUncommentPosts = [...state.allPosts];
            updatedUncommentPosts[indx].comments = updatedUncommentPosts[indx].comments.filter(c => c._id !== action.commentId)

            return {
                ...state,
                allPosts: updatedUncommentPosts
            }

        case ADD_COMMENT_TEMP:
            const i = state.allPosts.findIndex(post => post._id === action.postId);
            const updatedAddComment = [...state.allPosts];
            updatedAddComment[i].comments = updatedAddComment[i].comments.concat(action.comment)
            return {
                ...state,
                allPosts: updatedAddComment
            }


        case COUP_DE_COEUR:
            const hIndex = state.allPosts.findIndex(post => post._id === action.postId);
            const updatedRequestedPosts = [...state.allPosts];
            if (updatedRequestedPosts[hIndex].requested.indexOf(action.userId) === -1) {
                updatedRequestedPosts[hIndex].requested = updatedRequestedPosts[hIndex].requested.concat(action.userId);
            }
            return {
                ...state,
                allPosts: updatedRequestedPosts
            }


        default:
            return state;
    }
}