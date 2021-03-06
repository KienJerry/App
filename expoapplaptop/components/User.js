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

// import {icon, image} from '../photo/index'

// import Swiper from 'react-native-swiper'

export default function Home() {
  // const api = "http://192.168.1.102:3001/"; //
  const api = "http://192.168.1.8:3001/"; //

  // const api = "http://192.168.1.100:3001/";
  // const api = "http://10.22.219.50:3001/"; // local 192.168.43.70 , là lấy ở phần setting của thông tin wifi .
  // const api = "http://10.22.222.53:3001/"; // local 192.168.43.70 , là lấy ở phần setting của thông tin wifi .
  const [data, setData] = useState([]); //data đang là mảng rỗng =)) Vì trong database có nhiều mảng nên để rỗng thôi , Phần này với phần bên dưới là 1 cặp
  const [dataa, setDataa] = useState([]); //data đang là mảng rỗng =)) Vì trong database có nhiều mảng nên để rỗng thôi , Phần này với phần bên dưới là 1 cặp
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
      const response = await fetch(api + "sanpham/");
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
  const getDataa = async () => {
    try {
      const response = await fetch(api + "sanpham/");
      // const json = await response.json();
      const json = await response.json();
      console.log(json);
      // setData(json.movies);
      setDataa(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // const [isSelected, setSelection] = useState(false);





  useEffect(() => {
    getData();
    getDataa();
    
    fetch('http://192.168.1.8:3001/sanpham')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // ////////////////////////////////////////////////////////////////
  // const { search } = this.state;


  // // serach
  // // 

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);


  const searchFilterFunction = (text) => {
    
    if (text) {
    
      const newData = masterDataSource.filter(function (item) {
       
        const itemData = item.tensanpham
          ? item.tensanpham.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };





  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.masanpham + ' Title : ' + item.tensanpham);
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
        <Image
          style={{ height: 30, width: 30, marginEnd: 10, marginTop: 5 }}
          source={icon.iconshopping}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator= {false}>
        <Swiper
          style={styles.wrapper}
          autoplay
          height={240}
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
            // numColumns={2}
          showsHorizontalScrollIndicator={false}
          horizontal
            style={styles.flatList}
            data={dataa}
            // keyExtractor={({ id }, index) => id} //Mỗi item trong flatList sẽ yêu cầu 1 key :> key đó là key id (giống như khóa chính)
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <Text style={styles.listItemHorizontal} key= {item.masanpham}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }} >
                    {item.mathuonghieu}{" "}
                  </Text>
                  {/* <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                    {item.tensanpham}
                  </Text>
                  <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                    {item.giasanpham}
                  </Text>
                  <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                    {item.loaisanpham}
                  </Text> */}
                  {/* <Image
                   style={{
                    width: 100,
                    height: 100
                  }} source={{ uri: 'http://10.22.219.50:3001/images/1648029169705.jpg' }} > </Image> */}
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
            data={filteredDataSource}
            onPress
            // keyExtractor={({ id }, index) => id} //Mỗi item trong flatList sẽ yêu cầu 1 key :> key đó là key id (giống như khóa chính)
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <Text style={styles.listItem} key= {item.masanpham}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }} >
                    {/* {item.mathuonghieu}{" "} */}
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
                  {/* <Image
                   style={{
                    width: 100,
                    height: 100
                  }} source={{ uri: 'http://10.22.219.50:3001/images/1648029169705.jpg' }} > </Image> */}
                </Text>
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
