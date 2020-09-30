
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./bottomNavigation";
import SideBar from '../screens/home/sideBar/sideBar'
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={<SideBar/>}>
      <Drawer.Screen name="Home" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;