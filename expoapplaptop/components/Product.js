import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
// import Icon from "../photo/icon";
import { image, icon } from "../photo/index";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#CAF0F8", flexDirection: "row", marginVertical:2  }}>
        <Image
          style={{
            marginVertical: 35,
            marginStart: 20,
            width: 70,
            height: 70,
          }}
          source={icon.background}
        />
        <View style={{ marginVertical: 35, marginStart: 10 }}>
          <Text style={{ color: "#252525" }}>
            
            Bạn có 1 đơn hàng mới trong giỏ hàng, vui lòng thanh toán
          </Text>
          <Text style={{ marginVertical: 5, color: "#252525" }}>
           
            Bạn đã them vào đơn hàng Laptop ACER ABC 15 in, ram 8GB,SSD 525GB,
            có bàn phím, có chuột, ...
            
          </Text>
          <Text style={{  color: "#252525" , flexDirection:'row'}}>
           
           
            <MaterialIcons name="timer" color="#252525" size={15} />
         
            Thời gian
          </Text>
        </View>
      </View>
      
      <View style={{ backgroundColor: "#CAF0F8", flexDirection: "row", marginVertical:2  }}>
        <Image
          style={{
            marginVertical: 35,
            marginStart: 20,
            // borderRadius: 50,
            width: 70,
            height: 70,
          }}
          source={icon.background}
        />
        <View style={{ marginVertical: 35, marginStart: 10 }}>
          <Text style={{ color: "#252525" }}>
            
            Trương Phú Đồng{" "}
          </Text>
          <Text style={{ marginVertical: 5, color: "#252525" }}>
           
            Bạn đã them vào đơn hàng Laptop ACER ABC 15 in, ram 8GB,SSD 525GB,
            có bàn phím, có chuột, ...
            
          </Text>
          <Text style={{  color: "#252525" , flexDirection:'row'}}>
            {" "}
            {" "}
            {" "}
            {/* <Icon name='clock' size={20} />  */}
            <MaterialIcons name="timer" color="#252525" size={15} />
            {" "}
            Thời gian
          </Text>
        </View>
      </View>
      
      <View style={{ backgroundColor: "#CAF0F8", flexDirection: "row", marginVertical:2  }}>
        <Image
          style={{
            marginVertical: 35,
            marginStart: 20,
            // borderRadius: 50,
            width: 70,
            height: 70,
          }}
          source={icon.background}
        />
        <View style={{ marginVertical: 35, marginStart: 10 }}>
          <Text style={{ color: "#252525" }}>
            
            Trương Phú Đồng{" "}
          </Text>
          <Text style={{ marginVertical: 5, color: "#252525" }}>
           
            Bạn đã them vào đơn hàng Laptop ACER ABC 15 in, ram 8GB,SSD 525GB,
            có bàn phím, có chuột, ...
            
          </Text>
          <Text style={{  color: "#252525" , flexDirection:'row'}}>
            {" "}
            {" "}
            {" "}
            {/* <Icon name='clock' size={20} />  */}
            <MaterialIcons name="timer" color="#252525" size={15} />
            {" "}
            Thời gian
          </Text>
        </View>
      </View>
      
      <View style={{ backgroundColor: "#CAF0F8", flexDirection: "row", marginVertical:2  }}>
        <Image
          style={{
            marginVertical: 35,
            marginStart: 20,
            // borderRadius: 50,
            width: 70,
            height: 70,
          }}
          source={icon.background}
        />
        <View style={{ marginVertical: 35, marginStart: 10 }}>
          <Text style={{ color: "#252525" }}>
            
            Trương Phú Đồng{" "}
          </Text>
          <Text style={{ marginVertical: 5, color: "#252525" }}>
           
            Bạn đã them vào đơn hàng Laptop ACER ABC 15 in, ram 8GB,SSD 525GB,
            có bàn phím, có chuột, ...
            
          </Text>
          <Text style={{  color: "#252525" , flexDirection:'row'}}>
            {" "}
            {" "}
            {" "}
            {/* <Icon name='clock' size={20} />  */}
            <MaterialIcons name="timer" color="#252525" size={15} />
            {" "}
            Thời gian
          </Text>
        </View>
      </View>
      
      <View style={{ backgroundColor: "#CAF0F8", flexDirection: "row", marginVertical:2  }}>
        <Image
          style={{
            marginVertical: 35,
            marginStart: 20,
            // borderRadius: 50,
            width: 70,
            height: 70,
          }}
          source={icon.background}
        />
        <View style={{ marginVertical: 35, marginStart: 10 }}>
          <Text style={{ color: "#252525" }}>
            
            Trương Phú Đồng{" "}
          </Text>
          <Text style={{ marginVertical: 5, color: "#252525" }}>
           
            Bạn đã them vào đơn hàng Laptop ACER ABC 15 in, ram 8GB,SSD 525GB,
            có bàn phím, có chuột, ...
            
          </Text>
          <Text style={{  color: "#252525" , flexDirection:'row'}}>
            {" "}
            {" "}
            {" "}
            {/* <Icon name='clock' size={20} />  */}
            <MaterialIcons name="timer" color="#252525" size={15} />
            {" "}
            Thời gian
          </Text>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
