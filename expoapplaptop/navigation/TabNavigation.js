import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { MaterialCommunityIcons } from '@expo/vector-icons';

import { MainStackNavigator, ContactStackNavigator,ContactStackPersonnal } from "./StackNavigation";

const Tab = createMaterialBottomTabNavigator();
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="User"
      activeColor="#0c85b9"
      barStyle={{ backgroundColor: "#252525" }}
    >
      <Tab.Screen
        name="Trang Chủ"
        // options={{ headerShown: false }}
        options={{
          // tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={23} />
          ),
        }}
        component={MainStackNavigator}
      />
      <Tab.Screen
        name="Thông báo"
        // options={{ headerShown: true }}
        options={{
          tabBarBadge: 1000+ '+',

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={23} />
          ),
        }}
        component={ContactStackNavigator}
      />
      <Tab.Screen
        name="Cá nhân"
        // options={{ headerShown: false }}
        component={ContactStackPersonnal}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={23} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
