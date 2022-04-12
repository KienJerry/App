import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { images, icon } from "../photo/index";

import "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {
  // const { colors } = useTheme();
  const tokenlogin = async() => {
    const value = await AsyncStorage.getItem('luutaikhoan')
    if (value !== null) {
        navigation.navigate('Home')  
    }
}

tokenlogin()

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0c85b9" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceInUp"
          duraton="15000"
          source={icon.background1}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text onPress={() => navigation.navigate("Home")} style = {{fontFamily: 'sans-serif-condensed', fontWeight: "bold" , padding : 10, marginVertical: 10 , fontSize : 20 }}> THẾ GIỚI ĐỒ CÔNG NGHỆ</Text>
      </View>
      <Animatable.View style={[styles.footer, {}]} animation="fadeInUpBig">
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.textSign}>Đăng ký</Text>
            <MaterialIcons name="navigate-next" color="#fff" size={20} />
           
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Splash;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#252525",
    // backgroundColor: '#252525' 
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  // footer: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   borderTopLeftRadius: 60,
  //   borderTopRightRadius: 60,

  //   paddingHorizontal: 30,
  // },
  logo: {
    width: 300,
    height: 220,
    marginHorizontal: 20,
    marginRight: 15,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",

    textAlign: "center",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    padding :20
  },
  signIn: {
    width: height_logo,
    height: 45,
    // marginTop: 40,
    // marginEnd: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "#252525",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
    alignItems: 'flex-end',
    marginHorizontal: 20,
     padding: 10
    // width: 200
  },
}); 
