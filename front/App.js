import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import FlashMessage from "react-native-flash-message";
import { MenuProvider } from 'react-native-popup-menu';



import * as Localization from 'expo-localization';
import { LanguageProvider } from 'react-native-translation'
const locale = Localization.locale


// import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './store/reducers/auth';
import postsReducer from './store/reducers/posts';
import eventsReducer from './store/reducers/events';
import notifReducer from './store/reducers/notifs';
import usersReducer from './store/reducers/users';
import chatReducer from './store/reducers/chat';
import AppNavigator from './navigation/AppNavigator';
import storiesReducer from './store/reducers/stories';


const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  events: eventsReducer,
  users: usersReducer,
  albums: usersReducer,
  friends: usersReducer,
  jumlages: usersReducer,
  notifs: notifReducer,

  archives: storiesReducer,
  chat: chatReducer,
  stories: storiesReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
  // composeWithDevTools()
);

export default function App() {

  return (


    <Provider store={store}>
      <LanguageProvider language={locale} >

        <MenuProvider>
          <AppNavigator />
        </MenuProvider>
        <FlashMessage position="top" />
      </LanguageProvider>

    </Provider>
  );
}

