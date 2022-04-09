import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Image,
  Animated,
  Modal,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "react-native-vector-icons/Feather";
import { icon } from "../photo";
import Icon from "react-native-vector-icons/FontAwesome";

const SignUpScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);

  const [tendangkys, settendangky] = useState("");
  const [passdangkys, setpassdangky] = useState("");

  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  // đây là checkuser, đăng ký
  const checkusers = () => {
    if (tendangkys === "" || tendangkys === null) {
      Alert.alert("Cảnh báo", "Tên không được bỏ trống!");
      return;
    }

    if (passdangkys === "" || passdangkys === null) {
      Alert.alert("Cảnh báo", "Pass không được bỏ trống!");
      return;
    }

    // fetch("http://192.168.43.153:3001/dangky", {
    // fetch("http://10.22.201.45:3001/dangky", {
    fetch("http://192.168.43.153:3001/dangky", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tentaikhoans: tendangkys,
        matkhaus: passdangkys,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success === true) {
          Alert.alert("Thông báo", "Tạo thành công!");
          navigation.navigate("SignIn");
        } else {
          Alert.alert("Thông báo", "Tài khoản tồn tại!");
        }
      });
    Alert.alert("Thông báo", "Tạo thành công!");
  };

  // đay là thông báo poup
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
          Đăng ký
        </Animatable.Text>
      </View>
      <Animatable.View animation="fadeInRightBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Tên tài khoản</Text>
          <View style={styles.action}>
            <Icon size={25} name="user" />

            <TextInput
              placeholder="Tên tài khoản"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={settendangky}
            />

            {/* {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null} */}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Mật khẩu
          </Text>
          <View style={styles.action}>
            <Icon size={25} name="lock" />
            <TextInput
              placeholder="Nhập mật khẩu"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={setpassdangky}
              placeholderTextColor={{ color: "#252525" }}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Nhập lại mật khẩu
          </Text>
          <View style={styles.action}>
            <Icon size={25} name="lock" />

            <TextInput
              placeholder="Nhập lại mật khẩu"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
            />
            <TouchableOpacity></TouchableOpacity>
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              Bằng cách đăng ký, bạn đồng ý với
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              Điều khoản dịch vụ
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              Chính sách bảo mật
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              // onPress={() => setVisible(true)}

              onPress={() => checkusers()}
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
                Đăng ký
              </Text>
              {/* </LinearGradient> */}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("SignIn")}
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
                Đăng nhập
              </Text>
            </TouchableOpacity>
            <Text style={{marginVertical: 20, fontSize: 20}} >Hoặc</Text>

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
                style={{
                  marginVertical: 30,
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Congratulations registration was successful
              </Text>
            </ModalPoup>
            {/* <Button title="Open Modal" onPress={() => setVisible(true)} /> */}
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0096C7",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    // borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 20,
    marginLeft: 20,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  text_footer: {
    color: "#000",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
  },
  action: {
    flexDirection: "row",

    borderRadius: 20,
    borderBottomColor: "#f2f2f2",
    // paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
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
    marginTop: 20,
    backgroundColor: "#252525",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
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
