import {
  visible,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Button,
  TextInput,
  FlatList,
  Pressable,
  SafeAreaView,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";

import Swiper from "react-native-swiper";
import { image, icon } from "../photo/index";
const { width } = Dimensions.get("window");

import { Input, SearchBar } from "react-native-elements";
import React, { useState, useEffect, Component } from "react";
import Dialog from "react-native-dialog";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../page/Colors";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Iconn from "react-native-vector-icons/FontAwesome";
import { concat } from "react-native-reanimated";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

export default function Home() {
  // api
  const api = "http://192.168.43.153:3001/";
  // data
  const [data, setData] = useState([]);
  const [dataa, setDataa] = useState([]);
  const [pagenumber, setpagenumber] = useState(1);

  // loadding
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoading, setLoading] = useState(false); // Dòng này là dành cho phần dialog (lúc bấm vào thêm sản phẩm sẽ có)
  const [refreshControl, setRefreshControl] = useState(false);

  // phân trang
  const getData = async () => {
    try {
      const response = await fetch(api + "sanpham/" + pagenumber);
      const json = await response.json();
      console.log(json);
      setData(data.concat(json));
      console.log(setData);
    } catch (error) {
      console.error(error);
    }
  };
  const getDataa = async () => {
    try {
      const response = await fetch(api + "hinhanh/");
      const json = await response.json();
      console.log(json);
      // setData(json.movies);
      setDataa(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
    getDataa();
    setIsLoading(true);

    fetch("http://192.168.43.153:3001/sanpham")
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });

    // fetch("http://192.168.1.101:3001/images/")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     setImage(json.someUrlOrBase64);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, [pagenumber]);

  // // serach

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.tensanpham
          ? item.tensanpham.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const handleReload = () => {
    setpagenumber(pagenumber + 1);
    setIsLoading(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* List Danh Sách Và Sửa*/}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            height: 40,
            backgroundColor: "#dddd",
            marginHorizontal: 10,
            // marginTop: 10,
            marginVertical: 10,
            borderRadius: 10,
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Image
            style={{
              height: 22,
              width: 22,
              marginVertical: 10,
              marginHorizontal: 10,
              opacity: 0.8,
              tintColor: "#0c85b9",
            }}
            source={icon.serach}
          />

          <TextInput
            autoCorrect={false}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            style={{
              width: "100%",
              opacity: 1,
              paddingStart: 10,
              borderBottomColor: "#252525",
            }}
          />
        </View>
        <Image
          style={{ height: 25, width: 25, marginEnd: 10, marginTop: 5 }}
          source={icon.iconshopping}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onEndReached={handleReload}
        data={data}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <Text style={styles.listItemHorizontal} key={item.mathuonghieu}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {item.mathuonghieu}{" "}
              </Text>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                {item.tensanpham}
              </Text>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                {item.giasanpham}
              </Text>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                {item.loaisanpham}
              </Text>
            </Text>
          </View>
        )}
      >
        <Swiper
          style={styles.wrapper}
          autoplay
          height={200}
          // onMomentumScrollEnd={(e, state, context) =>
          //   console.log("index:", state.index)
          // }
          showsPagination={false}
          dot={
            <View
              style={{
                backgroundColor: "rgba(0,0,0,.2)",
                width: 5,
                height: 5,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: "#000",
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
          paginationStyle={{
            bottom: -23,
            left: null,
            right: 10,
          }}
          // loop
        >
          <View
            style={styles.slide}
            // title={<Text>Aussie tourist dies at Bali hotel</Text>}
          >
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={{
                uri: "https://i0.wp.com/www.yugatech.com/wp-content/uploads/2019/07/asus-back-to-school-promo-yugatech-2019.jpg",
              }}
            />
          </View>
          <View
            style={styles.slide}
            // title={<Text>Big lie behind Nine’s new show</Text>}
          >
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={{
                uri: "https://1.bp.blogspot.com/-aHAtQIo6tuY/XAx88WDlYWI/AAAAAAABELs/cjbnur18E8cogQLYxQIAKr-EkZZ8dga0gCLcBGAs/s1600/acer-x-shopee.png",
              }}
            />
          </View>
          <View
            style={styles.slide}
            // title={<Text>Why Stone split from Garfield</Text>}
          >
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={{
                uri: "https://www.ungeek.ph/wp-content/uploads/2020/11/asus_shopee_11_11_big_christmas_sale.jpg",
              }}
            />
          </View>
          <View style={styles.slide}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={{
                uri: "https://www.phucanh.vn/media/news/3001_Postface1-LaptopFlashSale.jpg",
              }}
            />
          </View>
          <View style={styles.slide}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={{
                uri: "https://cdn.tgdd.vn/Files/2020/08/12/1279220/thumb_salelaptop_800x450.png",
              }}
            />
          </View>
        </Swiper>
        <View style={{}}>
          {/* horizontal list danh muc san pham  */}
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.flatList}
            data={dataa}
            // keyExtractor={({ id }, index) => id} //Mỗi item trong flatList sẽ yêu cầu 1 key :> key đó là key id (giống như khóa chính)
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <Text style={styles.listItemHorizontal} key={item.mathuonghieu}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {item.mathuonghieu}{" "}
                  </Text>
                  <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                    {item.tensanpham}
                  </Text>
                  <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                    {item.giasanpham}
                  </Text>
                  <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                    {item.loaisanpham}
                  </Text>
                </Text>
              </View>
            )}
          />
        </View>

        {/* ///////////////////////////////////////////// */}

        <View style={{ flex: 1, marginHorizontal: 2 }}>
          {/* vertical san pham  */}
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            data={data}
            onPress
            onEndReached={handleReload}
            // keyExtractor={({ id }, index) => id} //Mỗi item trong flatList sẽ yêu cầu 1 key :> key đó là key id (giống như khóa chính)
            renderItem={({ item, index }) => (
              <View style={{ flex: 1 }}>
                <View style={styles.listItem} key={item.masanpham}>
                  <Image
                    style={{ width: 150, height: 100 }}
                    source={{ uri: api + "images/" + item.mahinhanh }}
                  />

                  <Text style={{ fontSize: 15, fontWeight: "bold", backgroundColor: '#ffff', color: '#252525' , marginVertical: 10}}>
                    {item.tensanpham}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#0c85b9",
                      textDecorationLine: 'line-through',
                      fontFamily: ''
                    }}
                  >
                    {item.giacu.toLocaleString()}
                  </Text>
                  <Text
                 
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#0c85b9",
                    }}
                  >
                    {item.giasanpham.toLocaleString()}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
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
    marginHorizontal: 2,
    // flexDirection: 'column'
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
    width: 50,
    height: 50,
    borderRadius: 100,
    marginHorizontal: 5,
  },

  page: {
    borderRadius: 100,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },

  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },

  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  image: {
    width: 400,
    flex: 1,
  },
});
