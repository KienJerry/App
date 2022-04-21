import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import Swiper from "react-native-swiper";
// import Icon from "../photo/icon";
import { image, icon } from "../../photo/index";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {
  const logout = async() => {
    await AsyncStorage.removeItem('luutaikhoan')
    Alert.alert("Vui lòng thoát app")
    // navigation.navigate("SignUp")
    
     navigation.navigate("SignUp")}

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
      <View style={{ backgroundColor: "#0096C7", flexDirection: "row" }}>
        <Text style={{ marginTop : 15 ,color: '#000', borderBottomRightRadius: 20, backgroundColor: '#fff', flexDirection:'row' , height: 22, width: 80, fontWeight:'bold', }}>Trang cá nhân</Text>
        <View style={{ flexDirection: "row", position: "relative", right: 70}} >
          <Image
            style={{
              marginVertical: 35,
              marginStart: 20,
              borderRadius: 50,
              width: 70,
              height: 70,
            }}
            source={icon.avatar}
          />
          <View style={{ marginVertical: 35, marginStart: 10 }}>
            <Text style={{ marginVertical: 2, color: "#fff" }}>
              {" "}
              Trương Phú Đồng{" "}
            </Text>
            <Text style={{ marginVertical: 2, color: "#fff" }}>
              {" "}
              phudong123@gmail.com{" "}
            </Text>
            <Text style={{ marginVertical: 2, color: "#fff" }}>
              {" "}
             
            </Text>

            <Text onPress={logout}>Đăng Xuất</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 3, backgroundColor: "#ffed", marginTop: 20 }}>
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            backgroundColor: "#252525",
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <Icon
            size={30}
            style={{ color: "#fff", marginVertical: 20, marginStart: 15 }}
            name="user"
          />
          <Text
            style={{
              marginVertical: 2,
              color: "#fff",
              padding: 20,
              fontSize: 19,
            }}
            onPress={() => navigation.navigate("UpdateInformation")}
          >
            Cập Nhật Thông Tin
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            backgroundColor: "#252525",
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <Icon
            size={30}
            style={{ color: "#fff", marginVertical: 20, marginStart: 15 }}
            name="user"
          />
          <Text
            style={{
              marginVertical: 2,
              color: "#fff",
              padding: 20,
              fontSize: 19,
            }}
          >
            Tài khoản của bạn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            backgroundColor: "#252525",
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <Icon
            size={30}
            style={{ color: "#fff", marginVertical: 20, marginStart: 15 }}
            name="user"
          />
          <Text
            style={{
              marginVertical: 2,
              color: "#fff",
              padding: 20,
              fontSize: 19,
            }}
          >
            Tài khoản của bạn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            backgroundColor: "#252525",
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <Icon
            size={30}
            style={{ color: "#fff", marginVertical: 20, marginStart: 15 }}
            name="user"
          />
          <Text
            style={{
              marginVertical: 2,
              color: "#fff",
              padding: 20,
              fontSize: 19,
            }}
          >
            Tài khoản của bạn
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

          
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
