import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator, BrandStackNavigator, CartStackNavigator,UserStackNavigator, WishListStackNavigator } from "./stackNavigation";
import { Icon } from 'native-base';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: () => {
                let iconName;
                let type;
                if (route.name === 'Home') {
                    iconName = 'th-large'
                    type="FontAwesome"
                } else if (route.name === 'Search') {
                    iconName = 'search';
                    type="FontAwesome"
                } else if (route.name === 'Cart') {
                    iconName = 'shopping-bag';
                    type="FontAwesome"
                } else if (route.name === 'Wishlist') {
                    iconName = 'heart-o';
                    type="FontAwesome"
                } else if (route.name === 'User') {
                    iconName = 'user-o';
                    type="FontAwesome"
                }
                return <Icon style={{ color: 'rgb(0, 0, 0)' }} type={type} name={iconName} />;
            },
        })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                showLabel: false
            }}>
            <Tab.Screen name="Home" component={MainStackNavigator} />
            <Tab.Screen name="Search" component={BrandStackNavigator} />
            <Tab.Screen name="Cart" component={CartStackNavigator} />
            <Tab.Screen name="Wishlist" component={WishListStackNavigator} />
            <Tab.Screen name="User" component={UserStackNavigator} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;