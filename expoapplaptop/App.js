
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();
import RootStack from "./login/RootStack";

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Root"
          options={{ headerShown: false }}
          component={RootStack}
        /> */}
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
