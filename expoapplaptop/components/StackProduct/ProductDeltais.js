import React, { useState, useEffect, Component } from "react";
import { Text, View ,StyleSheet , Image , FlatList , TouchableOpacity, Alert , SafeAreaView , Button} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { image, icon } from "../../photo/index";
import { Badge } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import Swiper from "react-native-swiper";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = "http://192.168.43.70:3001/";
const YourApp = ({ route, navigation , x }) => {
  //lấy thông tin từ bên sản phẩm qua , giống như url
  const { masanpham , giasanpham ,giacu , tensanpham , hangsanxuat , mahinhanh} = route.params;

  var MaSanPham = JSON.stringify(masanpham);
  const [data, setData] = useState();
  const [dataImg , setDataImg] = useState();
  const[soluongslider , setsoluongslider] = useState([]);
  const [inputCart , setInputCart] = useState('');
  const [storageDataList , setStorageDataList] = useState([]);
  const [shouldShow, setShouldShow] = useState(false);

// gọi thông tin chi tiết sản phẩm
  const getData = async () => {
    const response = await fetch(api + 'editsanpham/' + MaSanPham);
    const json = await response.json();
  //  console.log(json);
   setData(json);
}
// gọi thông tin chi tiết hình ảnh sản phẩm slider
const getImageSlider = async () => {
  const response = await fetch(api + 'hienthi-image-id/' + MaSanPham);
  const json = await response.json();
//  console.log(json);
for (let i = 0; i < json.length; i++) {
  // console.log(json[i].url);
  // console.log( " hình ảnh " + i + " là : " + json[i].url);

  // console.log ("New " + soluongslider);
} 
 setDataImg(json);
}
useEffect(() => {
 getData();
 getImageSlider();
}, []);

  //tính %
  const tinh_phan_tram = 100 - (( giasanpham / giacu ) * 100) ;
  
//gọi api image
const image_lider = [
  api + 'images/1648187877851.jpg',
  api + 'images/1647930047244.jpg',
  api + 'images/1647933959346.jpg',
  api + 'images/1648094293542.jpg',
  api + 'images/1647930047244.jpg',
  api + 'images/1647933959346.jpg',
  api + 'images/1648094293542.jpg',
];

 //thêm giỏ hàng  (Lưu dạng mảng) 
 const addItemToList = async() => {
   const ListItem = {
     image : mahinhanh,
     name : tensanpham ,
     manufacturer : hangsanxuat ,
     giamoi : giasanpham ,
     giacu : giacu
   }
  try{
    storageDataList.push(ListItem); 
    const output = [
      ['cartitem', JSON.stringify(storageDataList)]
    ]
    // console.log(storageDataList)
    await AsyncStorage.multiSet(output);
    // setInputCart('');
    // console.log(inputCart);

    Alert.alert('Thêm thành công');
    navigation.navigate('GioHang')
  }catch(err){
    console.error("Lỗi thêm dữ liệu");
  }
}
  return (
    <View style= {{width : '100%', height : '100%',}}>
      <View style = {styles.container} >
          <Icon size={30} style = {{marginLeft: 10 ,  color: "#459ad8"}} name="chevron-left" onPress={() => navigation.navigate("SanPham")}/>
         <Text style = {{paddingLeft : 10 , fontSize: 20, fontWeight: "bold" , color: "#459ad8"}}> Chi tiết sản phẩm </Text> 
         <TouchableOpacity onPress={() => navigation.navigate("GioHang")}><Image style ={{height: 25, width: 25, marginEnd: 10 , marginLeft : 50}} source={icon.iconshopping}></Image></TouchableOpacity>
         <Icon size={30} style = {{marginLeft: 10 ,  color: "#459ad8"}} name="dots-vertical" onPress={() =>Alert.alert("3 chấm")}></Icon>
         
      </View>
    
 

      <FlatList 
    keyExtractor={(item, index) => {
      item.id;
    }}
   style={{backgroundColor : 'white'}}
   showsVerticalScrollIndicator={false}
   data={data}
   renderItem = {({item}) => (

    <View style={styles.full_scr} key={item.id}>
    <View  style={styles.background_img}>
        <View style={styles.img}>
        <Swiper
          //  autoplay
           showsPagination={true}
           paginationStyle={{     
             left: null,
           }}
          >
          {
            image_lider.map((s) => 
            <Image
              style={styles.image}
              source={{
                uri: s,
              }}
            /> )}
          
        </Swiper>
           </View>
    </View>

     

    
          <View style={styles.tensp} key={item.tensanpham} >
                <Text style={styles.text_tensp}>{item.tensanpham}</Text>
            </View>
            
            <View style={styles.rate} key={item.donvi}>
                <Rating 
                style ={{alignItems:'flex-start' , marginStart : 10}}
                  type='star'
                  ratingCount={5}
                  imageSize={16}
                  defaultRating = {5}
                />
                <Text style={{color: '#908d8d' , marginTop : -2 , marginStart : 10}}> | </Text>
                <Text style={{color: '#908d8d' , marginStart : 10}}> Đã bán : {item.masanpham}</Text>
                <Icon size={30} style = {{marginLeft: 25 ,  color: "red" , marginTop : -5}} name="heart-circle-outline"></Icon>
                <Icon size={30} style = {{marginLeft: 10 ,  color: "#459ad8" , transform: [{rotate: '45deg'}] , marginTop : -5}} name="paperclip"></Icon>
                <Icon size={30} style = {{marginLeft: 10 ,  color: "#459ad8" , marginTop : -5}} name="share"></Icon>
            </View>
            <View style={styles.gia} key={item.giasanpham}>
               <Text style={styles.giasp}>{item.giasanpham.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ</Text>
               <Text style={styles.giasp_cu}>{item.giacu.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ</Text>
               <Text style={styles.giasp_phan_tram}> Giảm {tinh_phan_tram.toFixed(0)} %</Text>
            </View>
            <View style={styles.thongtinchitiet} key={item.thongtin}>
              <View style={styles.thongtinchitiet_css}>
                <Text style={styles.thongtinchitiet_text}>Thông tin chi tiết</Text>
                <Text style={styles.thongtinchitiet_text_thuong}>- Hãng Sản Xuất : {item.hangsanxuat}</Text>
                <Text style={styles.thongtinchitiet_text_thuong_2}>- Thương Hiệu : {item.thuonghieu}</Text>
                <Text style={styles.thongtinchitiet_text_thuong_2}>- Màn Hình : {item.manhinh}</Text>
                <Text style={styles.thongtinchitiet_text_thuong_2}>- CPU : {item.cpu}</Text>
                <Text style={styles.thongtinchitiet_text_thuong_2}>- Ram : {item.ram}</Text>
                <Text style={styles.thongtinchitiet_text_thuong_2}>- Ổ Cứng : {item.ocung}</Text>
                <Text style={styles.thongtinchitiet_text_thuong_2}>- Trọng Lượng : {item.trongluong}</Text>
                <Text style={styles.thongtinchitiet_text_thuong_2}>- Năm Sản Xuất : {item.ngaysanxuat}</Text>
              </View>
            </View>
            <View style={styles.thongtinchitiet} key={item.chitietsanpham}>
              <View style={styles.thongtinchitiet_css_2}>
                <Text style={styles.thongtinchitiet_text}>Mô tả sản phẩm</Text>
                
                <SafeAreaView style={{ flex: 1 }}>
                         {!shouldShow ? (
                          <Text numberOfLines={4} style={styles.thongtinchitiet_text_thuong}>- {item.chitietsanpham}</Text>
                        ) : null}
                      
                      <View style={{}}>
                        
                        {shouldShow ? (
                          <Text style={styles.thongtinchitiet_text_thuong}>- {item.chitietsanpham}</Text>
                        ) : null}
                        <Text 
                        style ={styles.show_css}
                          onPress={() => setShouldShow(!shouldShow)}
                        >Xem thêm ...</Text>
                      </View>
                </SafeAreaView>
              </View>
            </View>
    </View>

        )}/>

<TouchableOpacity
  style={styles.submit}
  underlayColor='#fff'>
    <Text style={styles.submitText} onPress = {() => addItemToList()}>Chọn Mua</Text>
</TouchableOpacity>
    </View>
  );
}

export default YourApp;

const styles = StyleSheet.create({
  container: {
    height : 50,
    alignItems : "center",
    flexDirection: "row",
  },
  full_scr:{
    width: "100%",
    height: "100%",
  },
  background_img: {
    marginTop : 5,
    width : '100%' ,
    height : 200 ,
    alignItems : 'center'
  },
  img: {
    borderRadius : 10,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    width : "85%",
    height : 150
  },
  image: {
    width: "100%",
    height: 200,
    flex: 1,
    borderRadius : 10
  },
  tensp: {
    marginTop : 20,
    width: "100%",
    alignItems : 'center'
  },
  text_tensp : {
    fontSize: 20,
    fontWeight: "normal"
  },
  rate : {
    marginTop :20,
    width: "100%",
    flexDirection : 'row'
  },
  gia:{
    marginTop : 10,
    width: "100%",
    flexDirection : 'row'
  },
  giasp : {
    fontSize: 25,
    color : 'red',
    fontWeight: "bold" , 
    marginLeft: 10,
  },
  giasp_cu:{
    fontSize: 15,
    color : '#979797',
    fontWeight: "normal" , 
    marginLeft: 10,
    textDecorationLine : 'line-through',
    alignSelf : 'flex-end'
  },
  giasp_phan_tram:{
    borderWidth: 1,
    borderColor : 'red',
    backgroundColor:'#f5e1e1',
    fontSize: 15,
    color : 'red',
    fontWeight: "normal" , 
    marginLeft: 10,
    alignSelf : 'flex-end'
  },
  thongtinchitiet:{
    backgroundColor : '#efefef',
    width: "100%",
    flexDirection : 'row',
    justifyContent: 'center'
  },
  thongtinchitiet_css:{
    marginTop : 20,
    marginBottom : 20,
    borderRadius : 10,
    backgroundColor : 'white',
    width: "98%",
  },
  thongtinchitiet_css_2:{
    marginBottom : 20,
    borderRadius : 10,
    backgroundColor : 'white',
    width: "98%",
  },
  thongtinchitiet_text:{
    fontSize: 17,
    color : 'black',
    fontWeight: "bold" , 
  },
  thongtinchitiet_text_thuong:{
    fontSize: 16,
    color : 'black',
    marginLeft: 10,
    marginTop : 20,
  },
  thongtinchitiet_text_thuong_2:{
    fontSize: 16,
    color : 'black',
    marginLeft: 10,
  },
  submit: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20 ,

  },
  wrapper:{

  },
  slide: {
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  show_css : {
    fontSize: 17,
    fontWeight: "normal",
    textDecorationLine: 'underline',
    color : '#459ad8',
    textAlign: 'center',
  },
})