import React, { useEffect, useState, useCallback } from 'react';

import Colors from '../constants/Colors';
import { Platform, View, Image, Text, Animated, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllPostsScreen, { screenOptions as allPostsScreenOptions } from '../screens/post/AllPostsScreen';
import Post from '../screens/post/Post';

import EditPostScreen, { screenOptions as editPostScreenOptions } from '../screens/post/EditPostScreen';
import CommentsScreen, { screenOptions as commentsScreenOptions } from '../screens/post/CommentsScreen';
import LikesScreen, { screenOptions as LikesScreenOptions } from '../screens/post/LikesScreen';

import CoupDeCoeurRequests, { screenOptions as requestedScreenOptions } from '../screens/post/CoupDeCoeurRequest';

import AddPostScreen, { screenOptions as addPostScreenOptions } from '../screens/post/AddPostScreen';
import UserProfileScreen, { screenOptions as userProfileScreenOptions } from '../screens/user/UserProfileScreen';
import PublicAlbum from '../screens/user/PublicAlbum';
import PrivateAlbum from '../screens/user/PrivateAlbum';

import UserStatsScreen, { screenOptions as userStatsScreenOptions } from '../screens/user/UserStatsScreen';
import UserPostsScreen, { screenOptions as userPostsScreenOptions } from '../screens/user/UserPostsScreen';
import EditProfileScreen, { screenOptions as editProfileScreenOptions } from '../screens/user/EditProfileScreen';

import { useSelector, useDispatch } from "react-redux";
import ENV from '../env';


import DuoListScreen, { screenOptions as DuoListScreenOptions } from '../screens/chat/DuoListScreen';
import ChatListScreen, { screenOptions as chatListScreenOptions } from '../screens/chat/ChatListScreen';
import ChatScreen, { screenOptions as chatScreenOptions } from '../screens/chat/ChatScreen';


import CompleteProfile from '../screens/welcome/CompleteProfile';
import Welcome from '../screens/welcome/welcome';
import Birthday from '../screens/welcome/Birthday';
import ImageProfile from '../screens/welcome/ImageProfile';



import AuthScreen from '../screens/auth/AuthScreen';

import ForgotPasswordScreen, { screenOptions as forgotPasswordScreenOptions } from '../screens/auth/ForgotPasswordScreen';

import Agendaa from '../screens/events/Agenda'
import AddEvent from '../screens/events/AddEvent';
import EditEvent from '../screens/events/EditEvent';
import Search from '../screens/search/search';
import AllEvents from '../screens/events/AllEvents';
import Categories from '../screens/events/Category';

import CheckingAgenda from '../screens/events/AgendaCheck'

import Event from '../screens/events/Event';



import Jumelage from '../screens/jumelage/jumelage';

import Notifs from '../screens/notif/AllNotif';
import BADGE from '../screens/notif/Badge';



import Map from '../screens/nearByUsers/Map';
import MyLocation from '../screens/nearByUsers/MyLocation';


{/** events map */ }

import MyLocationEvents from '../screens/nearByEvents/MyLocation';


import ConfirmStory from '../screens/story/ComfirmStory';
import SeeAllStories from '../screens/story/SeeAllStories';


import { createDrawerNavigator } from '@react-navigation/drawer';

import Settings from '../screens/settings/settings';
import Generale, { screenOptions as generalSettingsScreenOptions } from '../screens/settings/generalSettings';

import Langue from '../screens/settings/langue';
import BlockedUsers from '../screens/settings/BlockedUsers';
import UpdateProfil from '../screens/settings/UpdateProfil';
import Security from '../screens/settings/Security';
import Desactivate from '../screens/settings/Desactivation';

import Status from '../screens/settings/Status';
import DarkMode from '../screens/settings/DarkMode';
import Locationn from '../screens/settings/MyLocation';
import Archiver from '../screens/settings/Archiver';
import MyEvents from '../screens/events/MyEvent';
import PublicPosts from '../screens/settings/PublicPost';




import UpdateProfilePic from '../screens/user/updateProfilePic';






import { Feather, AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';


import Archive from '../screens/archive/myStoryArchive';



const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? '#000' : '#000',
    },

    headerTintColor: Platform.OS === 'android' ? Colors.gold : Colors.gold,
    headerTitleStyle: { fontWeight: 'bold', letterSpacing: 2 },

};



const ProfilIMG = () => {
    let userId;
    userId = useSelector(state => state.auth.user._id);
    return (

        <Image
            source={{ uri: `${ENV.apiUrl}/user/photo/${userId}` }}

            resizeMode='cover'

            style={{
                margin: 5,
                width: 30
                , borderRadius: 5, borderColor: Colors.gold
                , borderWidth: 0.7, height: 30,
            }} ></Image>
    )
}



const PostStackNavigator = createStackNavigator();

const PostNavigator = () => {
    return (
        <PostStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <PostStackNavigator.Screen
                name="AllPosts"
                component={AllPostsScreen}
                options={{ headerShown: false }}
            />
            <PostStackNavigator.Screen
                name="STORIES"
                component={SeeAllStories}
                screenOptions={defaultNavOptions}

            />
            <PostStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
            <settings.Screen
                name="Blocked Users"
                component={BlockedUsers}

            />
            <PostStackNavigator.Screen
                name="Twinning"
                component={Jumelage}
                screenOptions={defaultNavOptions}
            />
            <PostStackNavigator.Screen
                name="UserStats"
                component={UserStatsScreen}
                options={userStatsScreenOptions}
            />
            <PostStackNavigator.Screen
                name="UserPosts"
                component={UserPostsScreen}
                options={userPostsScreenOptions}
            />
            <PostStackNavigator.Screen
                name="Public Album"
                component={PublicAlbum}
                options={defaultNavOptions}
            />
            <NotifStackNavigator.Screen
                name="Post"
                component={Post}
                options={defaultNavOptions}
            />
            <PostStackNavigator.Screen
                name="Private Album"
                component={PrivateAlbum}
                options={defaultNavOptions}
            />
            <PostStackNavigator.Screen
                name="Comments"
                component={CommentsScreen}
                options={commentsScreenOptions}

            />
            <PostStackNavigator.Screen
                name="Likes"
                component={LikesScreen}
                options={LikesScreenOptions}

            />
            <PostStackNavigator.Screen
                name="Requested"
                component={CoupDeCoeurRequests}
                options={requestedScreenOptions}

            />
            <PostStackNavigator.Screen
                name="EditPost"
                component={EditPostScreen}
                options={editPostScreenOptions}
            />

            <PostStackNavigator.Screen
                name="Chat"
                component={ChatScreen}
                options={chatScreenOptions}
            />
            <PostStackNavigator.Screen
                name="AddEvent"

                component={AddEvent}
                options={defaultNavOptions}
            />
            <PostStackNavigator.Screen
                name="CreatePost"
                component={AddPostScreen}
                options={addPostScreenOptions}
            />
            <PostStackNavigator.Screen
                name="Add Story"
                component={ConfirmStory}
                screenOptions={{
                    headerShown: false
                }}

            />
            <PostStackNavigator.Screen
                name="search"
                component={SearchNavigator}
                screenOptions={{
                    headerShown: false
                }}

            />


            <PostStackNavigator.Screen
                name="Create Event"
                component={AgendaNavigator}
                options={{ headerShown: false }}
            />
        </PostStackNavigator.Navigator>
    );
};




const CreatePostStackNavigator = createStackNavigator();

const CreatePostNavigator = () => {
    return (
        <CreatePostStackNavigator.Navigator
            screenOptions={addPostScreenOptions}
        >
            <CreatePostStackNavigator.Screen
                name="CreatePost"
                component={AddPostScreen}
                options={addPostScreenOptions}
            />
        </CreatePostStackNavigator.Navigator>
    );
};



const settings = createStackNavigator();

const generalSettings = () => {
    return (
        <settings.Navigator
            screenOptions={defaultNavOptions}
        >
            <settings.Screen
                name="Settings"
                component={Generale}
                options={generalSettingsScreenOptions}
            />
            <settings.Screen
                name="Langue"
                component={Langue}

            />
            <settings.Screen
                name="Archive"
                component={Archiver}

            />
            <settings.Screen
                name="Blocked Users"
                component={BlockedUsers}

            />
            <settings.Screen
                name="DarkMode"
                component={DarkMode}

            />

            <settings.Screen
                name="Security"
                component={Security}

            />
            <settings.Screen
                name="Desactivation"
                component={Desactivate}

            />
            <settings.Screen
                name="Status"
                component={Status}

            />
            <settings.Screen
                name="Update Profil"
                component={UpdateProfil}

            />
            <settings.Screen
                name="My Location"
                component={Locationn}

            />
            <settings.Screen
                name="Public Posts"
                component={PublicPosts}
                options={defaultNavOptions}
            />


        </settings.Navigator>
    );
};






const SettingsStackNavigator = createStackNavigator();

const SettingsNavigator = () => {
    return (
        <SettingsStackNavigator.Navigator
            screenOptions={defaultNavOptions}

        >
            <SettingsStackNavigator.Screen
                name="Menu"
                component={Settings}
                options={{ headerShown: false }}
            />
            <SettingsStackNavigator.Screen
                name="Settings"
                component={generalSettings}
                options={{ headerShown: false }}


            />
            <SettingsStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}

            />
            <NotifStackNavigator.Screen
                name="Comments"
                component={CommentsScreen}
                options={commentsScreenOptions}

            />
            <PostStackNavigator.Screen
                name="Likes"
                component={LikesScreen}
                options={LikesScreenOptions}

            />
            <PostStackNavigator.Screen
                name="Requested"
                component={CoupDeCoeurRequests}
                options={requestedScreenOptions}

            />
            <settings.Screen
                name="Blocked Users"
                component={BlockedUsers}

            />
            <PostStackNavigator.Screen
                name="Twinning"
                component={Jumelage}
                screenOptions={defaultNavOptions}
            />
            <PostStackNavigator.Screen
                name="Public Album"
                component={PublicAlbum}
                options={defaultNavOptions}
            />
            <NotifStackNavigator.Screen
                name="Post"
                component={Post}
                options={defaultNavOptions}
            />
            <PostStackNavigator.Screen
                name="Private Album"
                component={PrivateAlbum}
                options={defaultNavOptions}
            />
            <SettingsStackNavigator.Screen
                name="Chats"
                component={ChatListScreen}
                options={{ headerShown: false }}

            />
            <SettingsStackNavigator.Screen
                name="nearby"
                component={NearByNavigator}
                options={{ headerShown: false }}

            />

            <SettingsStackNavigator.Screen
                name="agenda"
                component={CheckingAgenda}
                options={{ headerShown: false }}
            />
            <SettingsStackNavigator.Screen
                name="archive"
                component={Archive}
                options={{ headerShown: false }}
            />
            <SettingsStackNavigator.Screen
                name="My Events"
                component={MyEvents}

            />
            <PostStackNavigator.Screen
                name="Add Event"

                component={AgendaNavigator}
                options={defaultNavOptions}
            />
            <NotifStackNavigator.Screen
                name="Event"
                component={Event}
                options={defaultNavOptions}
            />
            <settings.Screen
                name="Update Profil"
                component={UpdateProfil}

            />
            <settings.Screen
                name="UpdateProfilPic"
                component={UpdateProfilePic}
                options={{ headerShown: false }}

            />



        </SettingsStackNavigator.Navigator>
    );
};











const ChatStackNavigator = createStackNavigator();

const ChatNavigator = () => {
    return (
        <ChatStackNavigator.Navigator
            screenOptions={defaultNavOptions}


        >

            <ChatStackNavigator.Screen

                name="Chats"
                component={ChatListScreen}
                options={{ headerShown: false }}



            />

            <ChatStackNavigator.Screen
                name="Chat"
                component={ChatScreen}
                options={chatScreenOptions}
            />
        </ChatStackNavigator.Navigator>
    );
};




const Tab = createBottomTabNavigator();
function MyTabs() {
    return (


        <Tab.Navigator


            tabBarOptions={{
                activeTintColor: 'black',
                showIcon: true,
                activeBackgroundColor: '#111',
                showLabel: true,

                labelStyle: { color: 'white', fontSize: 15, fontWeight: 'bold' },
                labelPosition: 'beside-icon',
                style: {
                    backgroundColor: 'black',


                    height: 50,


                },



            }}

        >
            <Tab.Screen
                name="SOLO"
                component={ChatListScreen}
                options={{

                    tabBarIcon: (props) => (
                        <Feather
                            name="user"

                            size={25}

                            color='white'
                        />
                    )
                }}
            />
            <Tab.Screen name="DUO" component={DuoListScreen} options={{

                tabBarIcon: (props) => (
                    <Feather
                        name="users"

                        size={25}

                        color='white'
                    />
                )
            }} />
        </Tab.Navigator>

    );
}


const UserStackNavigator = createStackNavigator();

const UserNavigator = () => {
    return (
        <UserStackNavigator.Navigator
            screenOptions={defaultNavOptions}

        >
            <UserStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
            <settings.Screen
                name="Blocked Users"
                component={BlockedUsers}

            />
            <UserStackNavigator.Screen
                name="UserStats"
                component={UserStatsScreen}
                options={userStatsScreenOptions}
            />
            <UserStackNavigator.Screen
                name="UserPosts"
                component={UserPostsScreen}
                options={userPostsScreenOptions}
            />
            <UserStackNavigator.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={editProfileScreenOptions}
            />
            <UserStackNavigator.Screen
                name="CreatePost"
                component={AddPostScreen}
                options={addPostScreenOptions}
            />

            <UserStackNavigator.Screen
                name="Chat"
                component={ChatScreen}
                options={chatScreenOptions}

            />

        </UserStackNavigator.Navigator>
    );
};

const NearByUsersStackNav = createStackNavigator();

export const NearByNavigator = () => {
    return (
        <NearByUsersStackNav.Navigator
            screenOptions={defaultNavOptions}
        >
            <NearByUsersStackNav.Screen
                name="Map"
                component={MyLocation}
                options={{ headerShown: false }}
            />
            <NearByUsersStackNav.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
            <settings.Screen
                name="Blocked Users"
                component={BlockedUsers}

            />
            <PostStackNavigator.Screen
                name="Twinning"
                component={Jumelage}
                screenOptions={defaultNavOptions}
            />
        </NearByUsersStackNav.Navigator>
    );
};





const NearByEventsStackNav = createStackNavigator();

export const NearByEventsNavigator = () => {
    return (
        <NearByEventsStackNav.Navigator
            screenOptions={defaultNavOptions}
        >
            <NearByEventsStackNav.Screen
                name="Map Events"
                component={MyLocationEvents}
                options={{ headerShown: false }}
            />
            <NearByEventsStackNav.Screen
                name="Event"
                component={Event}
                options={defaultNavOptions}
            />

        </NearByEventsStackNav.Navigator>
    );
};




const NotifStackNavigator = createStackNavigator();

export const NotifNavigator = () => {
    return (

        <NotifStackNavigator.Navigator
            screenOptions={defaultNavOptions}

        >
            <NotifStackNavigator.Screen
                name="AllNotifs"

                component={Notifs}
                options={{ headerShown: false }}
            />

            <NotifStackNavigator.Screen
                name="Event"
                component={Event}
                options={defaultNavOptions}
            />
            <NotifStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
            <settings.Screen
                name="Blocked Users"
                component={BlockedUsers}

            />
            <PostStackNavigator.Screen
                name="Twinning"
                component={Jumelage}
                screenOptions={defaultNavOptions}
            />
            <PostStackNavigator.Screen
                name="Public Album"
                component={PublicAlbum}
                options={defaultNavOptions}
            />
            <PostStackNavigator.Screen
                name="Private Album"
                component={PrivateAlbum}
                options={defaultNavOptions}
            />
            <NotifStackNavigator.Screen
                name="Post"
                component={Post}
                options={defaultNavOptions}
            />
            <NotifStackNavigator.Screen
                name="Comments"
                component={CommentsScreen}
                options={commentsScreenOptions}

            />
            <PostStackNavigator.Screen
                name="Likes"
                component={LikesScreen}
                options={LikesScreenOptions}

            />
            <PostStackNavigator.Screen
                name="Requested"
                component={CoupDeCoeurRequests}
                options={requestedScreenOptions}

            />




        </NotifStackNavigator.Navigator>
    );
};









// search
const SearchStackNavigator = createStackNavigator();

export const SearchNavigator = () => {
    return (

        <SearchStackNavigator.Navigator
            screenOptions={defaultNavOptions}

        >
            <SearchStackNavigator.Screen
                name="Search"

                component={Search}
                options={{ headerShown: false }}
            />


            <SearchStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
            <settings.Screen
                name="Blocked Users"
                component={BlockedUsers}

            />
            <PostStackNavigator.Screen
                name="Twinning"
                component={Jumelage}
                screenOptions={defaultNavOptions}
            />
            <PostStackNavigator.Screen
                name="Public Album"
                component={PublicAlbum}
                options={defaultNavOptions}
            />
            <PostStackNavigator.Screen
                name="Private Album"
                component={PrivateAlbum}
                options={defaultNavOptions}
            />
            <NotifStackNavigator.Screen
                name="Post"
                component={Post}
                options={defaultNavOptions}
            />
            <NotifStackNavigator.Screen
                name="Comments"
                component={CommentsScreen}
                options={commentsScreenOptions}

            />
            <PostStackNavigator.Screen
                name="Likes"
                component={LikesScreen}
                options={LikesScreenOptions}

            />

        </SearchStackNavigator.Navigator>
    );
};





const Header = createMaterialTopTabNavigator();

export const HeaderNavigator = () => {



    return (


        <Header.Navigator
            screenOptions={allPostsScreenOptions}


            tabBarOptions={{
                activeTintColor: Colors.gold,
                showIcon: true,

                showLabel: false,
                indicatorStyle: {
                    borderBottomColor: Colors.gold,
                    borderBottomWidth: 2,

                },

                style: {
                    backgroundColor: 'black',

                    justifyContent: 'center',
                    height: 70,
                },
                headerTintColor: '#fff'
            }}
        >

            <Header.Screen
                name="Home"
                component={PostNavigator}
                options={({ route }) => ({


                    tabBarIcon: (props) => (



                        <Image style={{ width: 40, height: 25, justifyContent: 'center' }}
                            source={require('../assets/icona.png')} resizeMode='cover'
                        ></Image>


                    )
                })}
            />


            <Header.Screen


                name="CHATS"
                component={ChatNavigator}

                options={{

                    tabBarIcon: (props) => (
                        <Image style={{ width: 30, height: 30, justifyContent: 'center' }}
                            source={require('../assets/icons/chat.png')}
                        ></Image>
                    )
                }}
            />
            <Header.Screen
                name="Events"
                component={EventNavigator}
                options={{

                    tabBarIcon: (props) => (
                        <Image style={{ width: 30, height: 30, justifyContent: 'center' }}
                            source={require('../assets/icons/soirees.png')}
                        ></Image>
                    )
                }}
            />


            <Header.Screen
                name="notif"
                component={NotifNavigator}
                options={{
                    tabBarBadge: true,

                    tabBarIcon: (props) => (
                        <View>
                            <Image style={{ width: 30, height: 30, justifyContent: 'center', }}
                                source={require('../assets/icons/notif.png')}
                            ></Image>


                            {/** notification badge */}
                            <BADGE />


                        </View>



                    )


                }}
            />



            <Header.Screen
                name="search"
                component={SearchNavigator}
                options={{

                    tabBarIcon: (props) => (
                        <Image style={{ width: 30, height: 30, justifyContent: 'center', tintColor: 'white' }}
                            source={require('../assets/icons/search.png')}
                        ></Image>
                    )
                }}
            />
            {/** 
            <Header.Screen
                name="user"
                component={SettingsNavigator}
                options={{

                    tabBarIcon: (props) => (
                        <ProfilIMG />

                    )
                }}
            />

*/}


            <Header.Screen
                name="Settings"
                component={SettingsNavigator}

                options={{

                    tabBarIcon: (props) => (
                        <Image style={{ width: 30, height: 30, justifyContent: 'center', tintColor: 'white' }}
                            source={require('../assets/icons/settings.png')}
                        ></Image>)


                }}
            />
        </Header.Navigator>


    );
};




const CompleteProfileNavigator = createStackNavigator();

export const CompleteProfilNavigator = () => {
    return (
        <CompleteProfileNavigator.Navigator
            screenOptions={defaultNavOptions}
        >

            <CompleteProfileNavigator.Screen
                name="complete"
                component={CompleteProfile}
                options={{ headerShown: false }}
            />
            <CompleteProfileNavigator.Screen
                name="birthday"
                component={Birthday}
                options={{ headerShown: false }}
            />
            <CompleteProfileNavigator.Screen
                name="upload"
                component={ImageProfile}
                options={{ headerShown: false }}
            />
            <PostStackNavigator.Screen
                name="newsfeed"
                component={HeaderNavigator}
                options={{ headerShown: false }}
            />


        </CompleteProfileNavigator.Navigator>
    );
};


const WelcomeStackNavigator = createStackNavigator();

export const WelcomeNavigator = () => {
    return (
        <WelcomeStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <WelcomeStackNavigator.Screen
                name="welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />
            <AuthStackNavigator.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
            />
            <AuthStackNavigator.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={forgotPasswordScreenOptions}
            />

        </WelcomeStackNavigator.Navigator>
    );
};




const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >

            <AuthStackNavigator.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
            />
            <AuthStackNavigator.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={forgotPasswordScreenOptions}
            />

        </AuthStackNavigator.Navigator>
    );
};






const EventsStackNavigator = createStackNavigator();

export const EventNavigator = () => {
    return (

        <EventsStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >

            <EventsStackNavigator.Screen
                name="AllEvents"

                component={AllEvents}
                options={{ headerShown: false }}
            />
            <EventsStackNavigator.Screen
                name="Categories"
                component={Categories}
                options={{ headerShown: false }}
            />

            <EventsStackNavigator.Screen
                name="Map Events"
                component={MyLocationEvents}
                options={{ headerShown: false }}
            />
            <EventsStackNavigator.Screen
                name="Event"
                component={Event}
                options={defaultNavOptions}
            />
            <EventsStackNavigator.Screen
                name="EditEvent"

                component={EditEvent}
                options={defaultNavOptions}
            />
            <EventsStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
            <settings.Screen
                name="Blocked Users"
                component={BlockedUsers}

            />
            <PostStackNavigator.Screen
                name="Twinning"
                component={Jumelage}
                screenOptions={defaultNavOptions}
            />
            <PostStackNavigator.Screen
                name="Public Album"
                component={PublicAlbum}
                options={defaultNavOptions}
            />
            <PostStackNavigator.Screen
                name="Private Album"
                component={PrivateAlbum}
                options={defaultNavOptions}
            />


        </EventsStackNavigator.Navigator>
    );
};


// stack for the events fwest lagendaa
const AgendaStackNavigator = createStackNavigator();

export const AgendaNavigator = () => {
    return (

        <EventsStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >

            <EventsStackNavigator.Screen
                name="Agenda"
                component={Agendaa}
                options={{ headerShown: false }}
            />
            <EventsStackNavigator.Screen
                name="Event"
                component={Event}
                options={{ headerShown: false }}
            />


            <EventsStackNavigator.Screen
                name="Create Event"

                component={AddEvent}
                options={defaultNavOptions}

            />
            <EventsStackNavigator.Screen
                name="EditEvent"

                component={EditEvent}
                options={{ headerShown: false }}
            />
            <EventsStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
            <settings.Screen
                name="Blocked Users"
                component={BlockedUsers}

            />
            <PostStackNavigator.Screen
                name="Twinning"
                component={Jumelage}
                screenOptions={defaultNavOptions}
            />

        </EventsStackNavigator.Navigator>
    );
};












const DrawerComponent = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity
                style={{ alignItems: 'flex-end', margin: 16 }}
                onPress={() => navigation.openDrawer()}
            >
                <Feather
                    name="more-vertical"
                    size={20}
                    color={Colors.grey}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
};


const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    return (

        <Drawer.Navigator


        >

            <Drawer.Screen name="Settings" component={DrawerComponent} />

        </Drawer.Navigator>


    )
}





