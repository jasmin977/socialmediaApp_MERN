import React from 'react';
import { AuthNavigator, HeaderNavigator, CompleteProfilNavigator, WelcomeNavigator } from './SocialAppNavigator';
import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import StartupScreen from '../screens/StartupScreen';

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    const user = useSelector(state => state.auth.user);

    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);



    return (
        <NavigationContainer>
            {isAuth && user.complete === false && <CompleteProfilNavigator />}
            {isAuth && user.complete && <HeaderNavigator />}

            {!isAuth && didTryAutoLogin && <WelcomeNavigator />}
            {!isAuth && !didTryAutoLogin && <StartupScreen />}
        </NavigationContainer>
    );
}

export default AppNavigator;