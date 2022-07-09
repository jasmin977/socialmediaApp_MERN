import { VIEW_STORY, SET_STORIES, SET_ARCHIVE, CREATE_STORY, DELETE_STORY } from "../actions/stories";

const initialState = {
    allStories: [],
    allArchive: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_STORIES:
            return {
                ...state,
                allStories: action.stories
            }


        case SET_ARCHIVE:
            return {
                ...state,
                allArchive: action.archives
            }

        case CREATE_STORY:
            return {
                ...state,
                allStories: [action.storyData, ...state.allStories]
            }



        case DELETE_STORY:
            return {
                ...state,
                allStories: state.allStories.filter(story => story._id !== action.pid)
            }


        case VIEW_STORY:
            const sIndex = state.allStories.findIndex(story => story._id === action.storyId);
            const updatedRequestStory = [...state.allStories];
            if (updatedRequestStory[sIndex].views.indexOf(action.userId) === -1) {
                updatedRequestStory[sIndex].views = updatedRequestStory[sIndex].views.concat(action.userId);
            }
            return {
                ...state,
                allStories: updatedRequestStory
            }

        default:
            return state;
    }
}