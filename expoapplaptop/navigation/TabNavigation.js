import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { MainStackNavigator, ContactStackNavigator,ContactStackPersonnal } from "./StackNavigation";

const Tab = createMaterialBottomTabNavigator();
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="User"
      activeColor="#fff"
      barStyle={{ backgroundColor: "#252525" }}

    >
      <Tab.Screen
        name="Trang Chủ"
        // options={{ headerShown: false }}
        component={MainStackNavigator}
        options={{
          // tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Thông báo"
        // options={{ headerShown: true }}
        component={ContactStackNavigator}
        options={{
          // tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Cá nhân"
        // options={{ headerShown: false }}
        component={ContactStackPersonnal}
        options={{
          // tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={23} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
