import User from "../components/User";
import Product from "../components/Product";
import About from "../components/About";
import Context from "../components/Context";

import * as React from "react";
import { Text, StatusBar, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeAreaView from "react-native-safe-area-view";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="About" component={User} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const ContactStackNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Thông báo" component={Product} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
const ContactStackPersonnal = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Thông Tin cá nhân" component={About} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export { MainStackNavigator, ContactStackNavigator, ContactStackPersonnal };
