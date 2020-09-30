import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {MainStackNavigator} from './stackNavigation'
import DrawerNavigator from './drawrNavigator' 
import BottomTabNavigator from './bottomNavigation'

export default class HomeNavigator extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <BottomTabNavigator/>
      </NavigationContainer>
    )
  }
}