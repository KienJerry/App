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
  ImageBackground,
} from "react-native";

import Swiper from "react-native-swiper";
import { image, icon } from "../../photo/index";
const { width } = Dimensions.get("window");


import { Input, SearchBar } from "react-native-elements";
import React, { useState, useEffect, Component } from "react";
import Dialog from "react-native-dialog";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../page/Colors";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Iconn from "react-native-vector-icons/FontAwesome";

// import {icon, image} from '../photo/index'

// import Swiper from 'react-native-swiper'

export default function Home({ navigation }) {
  const api = "http://192.168.43.153:3001/"; //

  const [data, setData] = useState([]); //data đang là mảng rỗng =)) Vì trong database có nhiều mảng nên để rỗng thôi , Phần này với phần bên dưới là 1 cặp
  const [dataa, setDataa] = useState([]);
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
      const response = await fetch(api + "sanpham/" + pagenumber);
      const json = await response.json();
      // console.log(json);
      setData(data.concat(json));
      console.log(setData);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataa = async () => {
    try {
      const response = await fetch(api + "sanpham/");
      const json = await response.json();
      // console.log(json);
      // setData(json.movies);
      setDataa(json);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
    getDataa();

    // tim kiem

    fetch("http://192.168.43.153:3001/sanpham")
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [pagenumber]);

  const handleReload = () => {
    console.log("daloadding");
    setpagenumber(pagenumber + 1);
    setLoading(true);
  };
  ////////////////////////////////////////////////////////////////

  // tim kieem

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

  renderFooter = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
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
              marginHorizontal: 5,
              opacity: 0.8,
              tintColor: "#0c85b9",
            }}
            source={icon.serach}
          />

          {/* tim kiem */}
          <TextInput
            autoCorrect={false}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            style={{
              width: "100%",
              opacity: 1,
              paddingStart: 10,
            }}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("GioHang")}>
          <Image
            style={{ height: 30, width: 30, marginEnd: 10, marginTop: 5 }}
            source={icon.iconshopping}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        // onEndReached={handleReload}
      >
        <Swiper
          style={styles.wrapper}
          autoplay
          height={200}
          showsPagination={false}
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
          <View
            style={styles.slide}
            // title={<Text>Learn from Kim K to land that job</Text>}
          >
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={{
                uri: "https://www.speedmagazine.ph/wp-content/uploads/2020/09/asus-rog-shopee.jpg",
              }}
            />
          </View>
        </Swiper>

        <View style={{}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.flatList}
            data={dataa}
            // keyExtractor={idsp => idsp.id}
            keyExtractor={({ id }, index) => id} //Mỗi item trong flatList sẽ yêu cầu 1 key :> key đó là key id (giống như khóa chính)
            renderItem={({ item }) => (
              <View style={{ flex: 1, padding: 5 }}>
                <Text style={styles.listItemHorizontal}>
                  <Image
                    style={{ width: 40, height: 30 }}
                    source={{ uri: api + "images/" + item.mahinhanh }}
                  />
                </Text>
              </View>
            )}
          />
        </View>

        <View style={{ flex: 1, marginHorizontal: 2 }}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            data={data}
            onEndReached={handleReload}
            // keyExtractor={item => item.id}
            // keyExtractor={({ item }, index) => item} //Mỗi item trong flatList sẽ yêu cầu 1 key :> key đó là key id (giống như khóa chính)
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <View style={styles.listItem} key={item.masanpham}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ChiTietSanPham", {
                        masanpham: item.masanpham,
                        tensanpham: item.tensanpham,
                        loaisanpham: item.loaisanpham,
                        giasanpham: item.giasanpham,
                        giacu: item.giacu,
                        chitietsanpham: item.chitietsanpham,
                        hangsanxuat: item.hangsanxuat,
                        mahinhanh: item.mahinhanh,
                        thuonghieu: item.thuonghieu,
                        manhinh: item.manhinh,
                        cpu: item.cpu,
                        ram: item.ram,
                        ocung: item.ocung,
                        trongluong: item.trongluong,
                        ngaysanxuat: item.ngaysanxuat,
                      })
                    }
                  >
                    <Image
                      style={{ width: 150, height: 100 }}
                      source={{ uri: api + "images/" + item.mahinhanh }}
                    />

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        backgroundColor: "#ffff",
                        color: "#252525",
                        marginVertical: 10,
                      }}
                    >
                      {item.tensanpham}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#908d8d",
                        textDecorationLine: "line-through",
                        fontStyle: "italic",
                        // fontFamily: "",
                      }}
                    >
                      {item.giacu
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ"}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      {item.giasanpham
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ"}
                    </Text>
                  </TouchableOpacity>
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
  },
  listItemHorizontal: {
    // flex: 1,
    paddingLeft: 5,
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
    borderRadius: 10,
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
