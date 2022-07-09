import { SET_EVENTS, SET_PARTICIPANTS, INVITE, SET_CATEGORIES, CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, PARTICIPATE_EVENT, UNPARTICIPATE_EVENT, LIKE_EVENT, UNLIKE_EVENT, COMMENT_EVENT, UNCOMMENT_EVENT, ADD_COMMENT_TEMP } from "../actions/event";

const initialState = {
    allEvents: [],
    allParticipants: [],
    allCategories: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENTS:
            return {
                ...state,
                allEvents: action.events
            }

        case SET_CATEGORIES:
            return {
                ...state,
                allCategories: action.categories
            }


        case SET_PARTICIPANTS:
            return {
                ...state,
                allParticipants: action.participants
            }

        case CREATE_EVENT:
            return {
                ...state,
                allEvents: [action.eventData, ...state.allEvents]
            }

        case UPDATE_EVENT:
            const eventIndex = state.allEvents.findIndex(event => event._id === action.updatedEventData._id);
            const updatedAllEvents = [...state.allEvents];
            updatedAllEvents[eventIndex] = action.updatedEventData;
            return {
                ...state,
                allEvents: updatedAllEvents
            }

        case DELETE_EVENT:
            return {
                ...state,
                allEvents: state.allEvents.filter(event => event._id !== action.pid)
            }





        case INVITE:
            const vvvv = state.allEvents.findIndex(p => p._id === action.eventId);
            const updatedInvitedEvents = [...state.allEvents];
            if (updatedInvitedEvents[vvvv].invitedUsers.indexOf(action.friendId) === -1) {
                updatedInvitedEvents[vvvv].invitedUsers = updatedInvitedEvents[vvvv].invitedUsers.concat(action.friendId);
            }

            return {
                ...state,
                allEvents: updatedInvitedEvents,

            }


        case PARTICIPATE_EVENT:
            const pIndex = state.allParticipants.findIndex(p => p.refevent === action.eventId);
            const updatedPaticipateEvents = [...state.allParticipants];
            if (updatedPaticipateEvents[pIndex].parts.indexOf(action.userId) === -1) {
                updatedPaticipateEvents[pIndex].parts = updatedPaticipateEvents[pIndex].parts.concat(action.userId);
            }
            //console.log(updatedPaticipateEvents);
            return {
                ...state,
                allParticipants: updatedPaticipateEvents,

            }

        case UNPARTICIPATE_EVENT:
            const eInd = state.allParticipants.findIndex(p => p.refevent === action.eventId);
            const updatedUnpaticipateEvents = [...state.allParticipants];
            updatedUnpaticipateEvents[eInd].parts = updatedUnpaticipateEvents[eInd].parts.filter(x => x !== action.userId);
            return {
                ...state,
                allParticipants: updatedUnpaticipateEvents
            }




        default:
            return state;
    }
}
