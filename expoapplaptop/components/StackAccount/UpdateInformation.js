import React ,{ useState, useEffect, Component } from "react";
import { View, Text , StyleSheet , Image , TouchableOpacity,} from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { image, icon } from "../../photo/index";

export default function ViewBoxesWithColorAndText({ navigation }){
  const [userr, setuserr] = useState();
  const api = "http://192.168.43.70:3001/"
    
  const getData = async () => {
     const response = await fetch(api + 'taikhoan/');
     const json = await response.json();
    //  setData(json.movies);
    // console.log(json);
     setuserr(json);
   
 }
 useEffect(() => {
  getData();
}, []);
  return (
    <View  style={{width : '100%', height : '100%'}}>
      <View style = {styles.container}>
       <Icon size={30} style = {{marginLeft: 10}} name="chevron-left" onPress={() => navigation.navigate("About")}/>
         <Text style = {{paddingLeft : 10 , fontSize: 20, fontWeight: "bold"}}> Cập Nhật Thông Tin </Text>   
      </View>
      <View style = {styles.thong_tin}>
      <View style={{ backgroundColor: "#0096C7", flexDirection: "row" }}>
        <View style={{ flexDirection: "row", position: "relative"}} >
          <Image
            style={{
              marginVertical: 35,
              marginStart: 20,
              width: 100,
              height: 100,
            }}
            source={icon.avatar}
          />
          <View style={{ marginVertical: 35, marginStart: 10  }}>
            <Text style={{ marginVertical: 2, color: "#fff" , fontWeight: "bold" , fontSize : 15 }}>
              phudong123@gmail.com
            </Text>
            <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
          >
            <Text style={styles.textSign}>Thêm Hình</Text>
           
          </TouchableOpacity>
        </View>
          </View>
        </View>
      </View>
      </View>
        {/* <View
      style={{
        flexDirection: "row",
        height: 100,
        padding: 20,
        backgroundColor : "red"
      }}
    >
      <View style={{ backgroundColor: "blue", flex: 0.3 }} />
      <View style={{ backgroundColor: "black", flex: 0.5 }} />
      <Text>Hello World!</Text>
    </View> */}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    height : 50,
    alignItems : "center",
    flexDirection: "row",
  },
  thong_tin: {
    backgroundColor : "yellow",
    width : "100%" , 
    height : "100%",
  },
  signIn: {
    height: 40,
    width : 150,
    marginTop: 40,
    marginEnd: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
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