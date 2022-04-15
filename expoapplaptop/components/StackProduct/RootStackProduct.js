import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer , getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Cart from './cart'
import User from './User'
import ProductDektais from './ProductDeltais'
import SignUp from '../../login/SignUp'


function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack({navigation , route}) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="SanPham" component={User}/>
      <Stack.Screen name="ChiTietSanPham" component={ProductDektais} options={{tabBarVisible : false}}/>
      <Stack.Screen name="GioHang" component={Cart} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true} >
      <MyStack />
    </NavigationContainer>
  );
}
