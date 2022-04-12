import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Linking,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Colors from "../page/Colors";
import Feather from "react-native-vector-icons/Feather";
import { BlurView } from "@react-native-community/blur";
import RadialGradient from "react-native-radial-gradient";

import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {icon} from '../photo/index'
import SignOut from "../login/SignOut";

// const paperTheme = useTheme();

function signOut({navigation}) {
  // const logout = async() => {
  //     // await AsyncStorage.removeItem('luutaikhoan')
  //     navigation.navigate('Product')
      
  // }
  // logout();
return (
  <View>
    <Text>abc</Text>
  </View>
);
}

export function DrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginLeft: 25, flexDirection: "column" }}>
                <Avatar.Image
                  source={
                    icon.avatar
                  }
                  size={50}
                />
                <View style={{ flexDirection: "column" }}>
                  <Title style={styles.title}>Trương Phú Đồng</Title>
                  <Caption style={styles.caption}>dong12@gmail.com</Caption>
                </View>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Trang chủ"
              onPress={() => {
                props.navigation.navigate("Product");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Thông tin cá nhân"
              onPress={() => {
                props.navigation.navigate("User");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Thông tin cá nhân"
              onPress={() => {
                props.navigation.navigate("User");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Thông tin cá nhân"
              onPress={() => {
                props.navigation.navigate("User");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingBottom: 30,
    paddingTop: 30,
     backgroundColor: '#0c90b7'
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: "#fff",
    // fontFamily: 'opensans_bold',
    // không hoạt động, fontWeight và fontStyle không thể sử dụng
    fontWeight: "800",
    fontStyle: "italic",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    // backgroundColor: '#0c85b9'
  },
  bottomDrawerSection: {
    // marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderRadius: 30,
    borderEndColor: "#0cfe",
    // borderTopWidth: 1,
    // backgroundColor: '#0c85d9'
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
