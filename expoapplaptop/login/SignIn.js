import React, { useEffect, useState } from "react";
import {
  TextInput,
  StatusBar,
  Alert,
  View,
  StyleSheet,
  Button,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme } from "react-native-paper";
import { CheckBox } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';

 const api = "http://192.168.43.70:3001/"
const SignInScreen = ({ navigation }) => {
  const [check , setCheck] = useState(false);
  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

  const [tendangnhap, onChangetendangnhap] = useState("");
  const [passdangnhap, onChangepassdangnhap] = useState("");

  const checkuser = async() => {
    if (tendangnhap === "" || tendangnhap === null) {
      Alert.alert("Cảnh báo", "Tên không được bỏ trống!");
      return;
    }

    if (passdangnhap === "" || passdangnhap === null) {
      Alert.alert("Cảnh báo", "Pass không được bỏ trống!");
      return;
    }
  
    fetch( api + "dangnhap", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: tendangnhap,
        password: passdangnhap,
      }),
    })
      .then((response) => response.json())
      .then(async(res) => {
        if (res.success === true) {
          if(check === true){
            await AsyncStorage.setItem("luutaikhoan", tendangnhap)
            }else{ 
                console.log("Bạn chưa lưu tài khoản")   
            }
          navigation.navigate("Home");
        } else {
          Alert.alert("Cảnh báo", "" + res.message);
        }
      });
  };

  const [visible, setVisible] = React.useState(false);

  const ModalPoup = ({ visible, children }) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackGround}>
          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ scale: scaleValue }] },
            ]}
          >
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0096C7" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Text animation="fadeInRight" style={styles.text_header}>
          Đăng nhập
        </Animatable.Text>
      </View>
      <Animatable.View
        animation="fadeInRightBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}
        >
          Tài khoản
        </Text>
        <View style={styles.action}>
          <Icon name="user" size={25} />
          <TextInput
            placeholder="Nhập tên"
            placeholderTextColor="#666666"
            onChangeText={onChangetendangnhap}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}
        >
          Mật khẩu
        </Text>
        <View style={styles.action}>
          <Icon name="lock" size={25} />

          <TextInput
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#666666"
            onChangeText={onChangepassdangnhap}
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
          />
        </View>

        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

          <CheckBox
          checked={check}
          onPress={() => setCheck(!check)}
          title={"Lưu Mật Khẩu"}></CheckBox>

        <TouchableOpacity>
          <Text style={{ color: "#0096C7", marginTop: 15 }}>
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            // onPress={() => {
            //   loginHandle(data.username, data.password);
            // }}
            // onPress={() => navigation.navigate("Home")}
            onPress={() => checkuser()}
          >
            {/* <LinearGradient
              colors={["#0007", "#252525"]}
              style={styles.signIn}
            > */}
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              Đăng nhập
            </Text>
            {/* </LinearGradient> */}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={[
              styles.signIn,
              {
                borderColor: "#252525",
                borderWidth: 1,
                marginTop: 10,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#0096C7",
                },
              ]}
            >
              Đăng ký
            </Text>
          </TouchableOpacity>

          <Text style={{ marginVertical: 20, fontSize: 20 }}>Hoặc</Text>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              marginTop: 20,
              justifyContent: "space-around",
              // margin: 20
            }}
          >
            <Icon style={{ margin: 10 }} size={30} name="google" />
            <Icon style={{ margin: 10 }} size={30} name="facebook" />
          </View>

          <ModalPoup visible={visible}>
            <View style={{ alignItems: "center" }}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Image
                    // source={require("../assets/icon3.png")}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/checked.png")}
                style={{ height: 150, width: 150, marginVertical: 10 }}
              />
            </View>

            <Text
              style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
            >
              Congratulations registration was successful
            </Text>
          </ModalPoup>
          {/* <Button title="Open Modal" onPress={() => setVisible(true)} /> */}
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0096C7",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    // paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginLeft: 20,
    marginTop: 20,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    justifyContent: "center",
    paddingRight: 10,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    // paddingBottom: 5
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    // paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: 2,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    // marginTop: 50
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 40,
    backgroundColor: "#252525",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },

  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
