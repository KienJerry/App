// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";

import User from "../components/User";
import Product from "../components/Product";
import About from "../components/About";
import Context from "../components/Context";

// const Stack = createStackNavigator();

// const screenOptionStyle = {

//   headerStyle: {
//     backgroundColor: "#0c85b9",

//   },
//   headerTintColor: "white",
//   // headerBackTitle: "Back",
// };

// const MainStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown : 'true'}}>
//       <Stack.Screen name="User"   component={User} />
//     </Stack.Navigator>
//   );
// };

// const ContactStackNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="dddd" screenOptions={{headerShown: 'false'}}   component={Product} />
//       <Stack.Screen name="About" screenOptions={{headerShown: 'false'}} component={About} />
//       <Stack.Screen name="Context" component={Context} />
//     </Stack.Navigator>
//   );
// };

// export { MainStackNavigator, ContactStackNavigator };

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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
      
          <Stack.Screen name="Product" component={Product} />
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
      
          <Stack.Screen name="Thông Tin cá nhân" component={Product} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export { MainStackNavigator, ContactStackNavigator , ContactStackPersonnal};
