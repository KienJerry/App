import {
  visible,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
  Button,
  TextInput,
  text,
  FlatList,
  Dimensions,
  Pressable,
  SafeAreaView,
} from "react-native";

// import Icon from 'react-native-vector-icons/FontAwesome5'
// import { Swiper } from 'swiper/react';
// import { SliderBox } from "react-native-image-slider-box";

import { SearchBar } from "react-native-elements";
import React, { useState, useEffect } from "react";
import Dialog from "react-native-dialog";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../page/Colors";

export default function Home() {
  const api = "http://192.168.43.153:3001/"; //
  // const api = "http://192.168.1.101:3001/"; // local 192.168.43.70 , là lấy ở phần setting của thông tin wifi .
  const [data, setData] = useState([]); //data đang là mảng rỗng =)) Vì trong database có nhiều mảng nên để rỗng thôi , Phần này với phần bên dưới là 1 cặp
  const [pagenumber, setpagenumber] = useState(""); // set number là 1 :> Vì lúc đầu vào giao diện , mình sẽ load trang 1 nên để mặc định là 1
  const onPressLearnMore = (getpage) => {
    // code cho button chuyen trang
    setpagenumber(getpage);
    //getData();
  };

  // this.state = {
  //   searchText: "",
  //   data: [],
  //   filteredData: []
  // };

  const [isLoading, setLoading] = useState(false); // Dòng này là dành cho phần dialog (lúc bấm vào thêm sản phẩm sẽ có)
  //Thêm Sản Phẩm code
  const [tenconst, settenconst] = useState(""); // Gọi tên sản phẩm khi show dialog
  const [loaiconst, setloaiconst] = useState(""); // Gọi Loại sản phẩm khi show dialog
  //code add product

  // code gọi phân trang
  const getData = async () => {
    try {
      const response = await fetch(api + "thuonghieu/");
      // const json = await response.json();
      const json = await response.json();
      console.log(json);
      // setData(json.movies);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  ////////////////////////////////////////////////////////////////
  const [isSelected, setSelection] = useState(false);
  // const { search } = this.state;
  // serach
  const [searchText, setSearchText] = useState("");
  const filteredFoods = () =>
    foods.filter((eachFood) =>
      eachFood.name.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <View style={{ flex: 1 }}>
      {/* List Danh Sách Và Sửa*/}
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={(text) => this.searchFilterFunction(text)}
        autoCorrect={false}
      />

      {/* <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper> */}

      <View style={{ flex: 1, padding: 5, paddingLeft: 15 }}>
        <FlatList
          // numColumns={2}
          // showsHorizontalScrollIndicator={true}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.flatList}
          data={data}
          keyExtractor={({ id }, index) => id} //Mỗi item trong flatList sẽ yêu cầu 1 key :> key đó là key id (giống như khóa chính)
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <Text style={styles.listItemHorizontal}>
                {" "}
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                  {" "}
                  {item.tenthuonghieu}{" "}
                </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {" "}
                  {item.email}
                </Text>
                <Text>{item.diachi}</Text>
                {/* <Text> {item.email} </Text> */}
              </Text>
            </View>
          )}
        />
      </View>

      <View style={{ flex: 1, padding: 5, paddingLeft: 15 }}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          data={data}
          keyExtractor={({ id }, index) => id} //Mỗi item trong flatList sẽ yêu cầu 1 key :> key đó là key id (giống như khóa chính)
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <Text style={styles.listItem}>
                {" "}
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                  {" "}
                  {item.tenthuonghieu}{" "}
                </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {" "}
                  {item.email}
                </Text>
                <Text>{item.diachi}</Text>
                {/* <Text> {item.email} </Text> */}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    // flex: 1,
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
    color: "#000",
    backgroundColor: "#ffff",
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowOpacity: 2.5,
    shadowRadius: 5,
    elevation: 5,
    width: 190,
    height: 230,
  },
  listItemHorizontal: {
    // flex: 1,
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
    color: "#000",
    backgroundColor: "#ffff",
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowOpacity: 2.5,
    shadowRadius: 5,
    elevation: 5,
    width: 190,
    height: 130,
  },
  page: {
    borderRadius: 100,
  },
});
