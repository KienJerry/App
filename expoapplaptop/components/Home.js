import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerContent } from "../navigation/DrawerContact";
import User from "./User";
import TabNavigator from "../navigation/TabNavigation";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{ headerShown: false }}
          component={TabNavigator}
        />

        <Drawer.Screen
          name="User"
          options={{ headerShown: false }}
          component={User}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
