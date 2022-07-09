import { SET_CHAT_LIST, SET_ONLINE_USERS, SET_CHATS, ADD_CHAT } from "../actions/chat";


const initialState = {
    chatList: [],
    allChats: [],
    onlineUsers: []
};


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CHAT_LIST:
            return {
                ...state,
                chatList: action.chatList
            }

        case SET_CHATS:
            return {
                ...state,
                allChats: action.chats
            }

        case SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.onlineusers
            }


        case ADD_CHAT:
            let updatedAllChats = [...state.allChats];
            updatedAllChats = updatedAllChats.concat(action.newChat)
            return {
                ...state,
                allChats: updatedAllChats
            }

        default:
            return state;
    }
}


