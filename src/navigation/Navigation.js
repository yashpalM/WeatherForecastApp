import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ZipCodeView from '../views/ZipCodeView';
import WeatherView from '../views/WeatherView';
import colors from '../constants/colors';

const stackNavigator = createStackNavigator();

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: colors.primary,
    },
    headerTintColor: colors.white,
    headerTitleStyle: {
        fontWeight: 'bold',
    }
}

const Navigation = props => {
    return <NavigationContainer>
        <stackNavigator.Navigator screenOptions={defaultNavOptions} initialRouteName="ZipCodeView">
            <stackNavigator.Screen name="WeatherView" component={WeatherView}
                options={{ title: 'Weather Forcast' }} />
            <stackNavigator.Screen name="ZipCodeView" component={ZipCodeView}
                options={{ title: 'Zipcode' }} />
        </stackNavigator.Navigator>
    </NavigationContainer>
}

export default Navigation;