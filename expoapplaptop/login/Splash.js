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
import { images, icon } from '../photo/index'

import "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';



const Splash = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0c85b9" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceInUp"
          duraton="15000"
          source={images.background}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
          },
        ]}  
        animation="fadeInUpBig"
      >
       
        <View style={styles.button}>
          <TouchableOpacity style= {styles.signIn} onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.textSign}> Bắt đầu</Text>
            {/* <MaterialIcons name="navigate-next" color="#fff" size={20} /> */}
            <Icon size={20} style ={{color:'white', marginLeft: 10}} name = {'angle-right'}/>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Splash;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#252525"
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,

    paddingHorizontal: 30,
  },
  logo: {
    width: 250,
    height: 230
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
    marginTop: 100,
  },
  signIn: {
    width: height_logo,
    height: 45,
    // marginTop: 40,
    marginEnd: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
        backgroundColor: "#252525",


  },
  textSign: {
    color: "white",
    fontWeight: "bold",

  },
});
