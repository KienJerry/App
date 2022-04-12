import React, { useState , useEffect } from 'react';
import { Text, View, StyleSheet , Image , TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckBox } from "react-native-elements";
import InputSpinner from "react-native-input-spinner";
import AsyncStorage from '@react-native-async-storage/async-storage';

const GioHang = ({navigation}) => {
  const [check , setCheck] = useState(false);
  const [storageDataList , setStorageDataList] = useState([]);

  useEffect(() => {
    //Phải viết function , gọi mỗi Item là bị lỗi trùng lặp 
    async function tempFunction() {
      await getItemList();
    }
    tempFunction();
    return () => {
      <Text>Không có dữ liệu</Text>
    };

    // getItemList();
  } , []);

    //lấy dữ liệu của mảng
    const getItemList = async() =>{
      try{
        const data = await AsyncStorage.getItem('cartitem');
        const output = JSON.parse(data);
        setStorageDataList(output);
        console.log(output);
      }catch(err){
        console.error("Lỗi lấy dữ liệu");
      }
    }

  return (
    <View style= {{width : '100%', height : '100%', backgroundColor : '#ededed'}}>
        <View style = {styles.container} >
          <Icon size={30} style = {{marginLeft: 10 ,  color: "#459ad8"}} name="chevron-left" onPress={() => navigation.goBack()}/>
          <Text style = {{paddingLeft : 10 , fontSize: 20, fontWeight: "bold" , color: "#459ad8"}}> Giỏ Hàng </Text>     
        </View>
        
          <View style ={styles.background_cart}>
              <View style={styles.background_two} >
                  <Text numberOfLines={2} style={styles.text_name}>Tên Sản Phẩm Nguyễn Thế Kiên học trường FPt Poly Technic Tên Sản Phẩm Nguyễn Thế Kiên học trường FPt Poly Technic </Text>
                  <Text numberOfLines={2} style={styles.text_name_one}>- Hãng Sản Xuất</Text>
                  <View style={styles.gia}>
                    <Text style={styles.giasp}>{"50000".toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ</Text>
                    <Text style={styles.giasp_cu}>{"55000".toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ</Text>
                  </View>
                  <View style={styles.css_spin}>
                      <View style={styles.spinner_css}>
                          <InputSpinner
                            max={5}
                            min={1}
                            step={1}
                            color = {"#40c5f4"}
                            colorMax={"red"}
                            colorMin={"red"}
                            buttonFontSize = {20}
                            fontSize = {17}
                            colorPress={"red"}
                            skin="modern"
                            
                            // value={this.state.number}
                            // onChange={(num) => {
                            //   console.log(num);
                            // }}
                          />
                      </View>
                      <Text style={styles.text_del}>Xóa</Text>
                  </View>
                  
                  
              </View>
              <View style={styles.background_one} >
                <View style={{justifyContent: "center", flex:1 , marginLeft: -10 ,}}>
                  <CheckBox 
                    checked={check}
                    onPress={() => setCheck(!check)}></CheckBox>
                </View>
                <View style={{justifyContent: "center", alignItems: "flex-end", flex:5}}>
                    <Image
                        style={styles.image}
                        source={{
                          uri:  "http://192.168.43.70:3001/images/1648187877851.jpg",
                        }}
                      />
                </View>
              </View>
          </View>

          <View style={styles.list}>
        <Text>List</Text>
        {storageDataList.map((item, index) => {
          return (
            <Text style={{marginVertical: 10}} key={index}>
              {item}
            </Text>
          );
        })}
      </View>

          <View style={{alignItems : "flex-end" , backgroundColor : 'white' , flexDirection: "row",}}>
            <View style={styles.tong_css}>
               <Text style={styles.text_css_tong_cong}>Tổng cộng </Text>
               <Text style={styles.text_css_tong_cong_gia}>Vui lòng chọn sản phẩm </Text>
            </View>
            <TouchableOpacity
                style={styles.submit}
                underlayColor='#fff'>
                  <Text style={styles.submitText}>Mua Hàng (0)</Text>
            </TouchableOpacity>
          </View>

        
    </View>
  );
}

export default GioHang;
const styles = StyleSheet.create({
    container: {
      height : 50,
      alignItems : "center",
      flexDirection: "row",
      backgroundColor: '#d8d8d8',
    },
    background_cart:{
      marginBottom : 2 ,
      borderRadius : 10,
      flexDirection : 'row-reverse',
      width : '100%',
      height : "auto",
      backgroundColor : 'white',
    },
    image: {
      width: '80%',
      height: 70,
      borderRadius : 10,
    },
    background_one:{
      flex: 1, 
      paddingTop : 20 , 
      paddingBottom: 20 , 
      flexDirection: "row",
    },
    background_two:{
      flex: 1.5, 
      paddingTop : 20 , 
      paddingBottom: 20,
      marginLeft : 5,
    },
    text_name:{
      fontSize: 15,
      fontWeight:'bold'
    },
    text_name_one:{
      marginLeft: 10,
    },
    text_del:{
      color : '#459ad8',
      marginLeft : 10,
      fontSize: 15,
      fontWeight:'bold',
      justifyContent: 'center',
      alignItems : "center", 
       
    },
    gia:{
      width: "100%",
      flexDirection : 'row'
    },
    giasp : {
      fontSize: 17,
      color : 'red',
      fontWeight: "bold" , 
      marginLeft: 10,
    },
    giasp_cu:{
      fontSize: 12,
      color : '#979797',
      fontWeight: "normal" , 
      marginLeft: 10,
      textDecorationLine : 'line-through',
      alignSelf : 'flex-end'
    },
    spinner_css:{
      transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],
    },
    css_spin:{
      flexDirection: "row",
      direction:'rtl',
      justifyContent: 'flex-start',
      alignItems : "baseline",  
    },
    submit: {
      flex: 1,
      marginRight: 10,
      marginLeft: 10,
      marginTop: 10,
      padding : 10,
      backgroundColor: 'red',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#fff',
    },
    submitText: {
      fontWeight :'bold' ,
      color: '#fff',
      textAlign: 'center',
      fontSize: 16 ,
    },
    tong_css:{
      flex: 2 ,
      width : '100%',
      height : '100%'
    },
    text_css_tong_cong:{
      color : 'black',
      marginLeft : 20,
      fontSize: 15,
    },
    text_css_tong_cong_gia:{
      color : 'red',
      marginLeft : 20,
      fontSize: 15,
    },  
    list: {
      backgroundColor : 'yellow',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
})