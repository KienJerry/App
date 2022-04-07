import React ,{ useState, useEffect, Component } from "react";
import { View, Text , StyleSheet , Image , TouchableOpacity , Button, Platform, Alert , FlatList , VirtualizedList} from "react-native";
// import CheckBox from 'react-native-check-box'
import { DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { image, icon } from "../../photo/index";
import OutlineInput from 'react-native-outline-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { event } from "react-native-reanimated";
import {CheckBox} from 'react-native-elements';
import { TextInput } from "react-native-gesture-handler";
// import { FlatList } from "react-native-gesture-handler";

export default function ViewBoxesWithColorAndText({ navigation }){
  const [userr, setuserr] = useState();
  const [name, setName] = useState('');
  const [diachi , setDiachi] = useState('');
  const api = "http://192.168.43.70:3001/"

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show , setShow] = useState(false);
  const [text , setText] = useState('');

  const [nam , setNam] = useState(true);
  const [nu , setNu] = useState(false);
  const [khac , setKhac] = useState(false);

    //Code Date Time
  const onChange = (event, selectedDate) => {
    
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate()+'/'+(tempDate.getMonth()+1)+'/'+tempDate.getFullYear();
    // let fTime = 'Hours: ' + tempDate.getHours() + '| Minutes' + tempDate.getMinutes();
    // setText(fDate + '\n' + fTime);
    setText(fDate);
    // console.log(fDate + '(' + fTime + ')');
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }


//Code hiển thị thông tin tài khoản
  const getData = async () => {
     const response = await fetch(api + 'taikhoan/kien123@gmail.com');
     const json = await response.json();
    //  setData(json.movies);
    // console.log(json);
    console.log(json);
     setuserr(json);
 }
 useEffect(() => {
  getData();
}, []);

//code check box
const hobbies = []

const clickbox = () => {
  if(nam === true){
    hobbies.push("Nam");
  }if(nu === true){
    hobbies.push("Nữ");
  }if(khac === true){
    hobbies.push("Khác");
  }
  Alert.alert("Tích vào : " + hobbies);
}

  return (
   
    <View style={{backgroundColor : 'white'}}>
     <FlatList 
    
      keyExtractor={({ name }, index) => name }
      key = {name.tennguoidung}
     style={{backgroundColor : 'white'}}
     showsVerticalScrollIndicator={false}
     data={userr}
     renderItem = {({item}) => (

      <View  style={{width : '100%', height : '100%'}} key= {item.mataikhoan}>
      <View style = {styles.container}>
       <Icon size={30} style = {{marginLeft: 10}} name="chevron-left" onPress={() => navigation.navigate("About")}/>
         <Text style = {{paddingLeft : 10 , fontSize: 20, fontWeight: "bold"}}> Cập Nhật Thông Tin </Text>   
      </View>
      <View style = {styles.thong_tin} key= {item.mataikhoan}>
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
                  {item.taikhoan}
              </Text>

              <View style={styles.button}>
                  <TouchableOpacity style={styles.signIn}>
                    <Text style={styles.textSign}>Thêm Hình</Text>
                  </TouchableOpacity>
              </View>
          </View>
        </View>
        
      </View>

    <View style = {styles.input}>
      <OutlineInput
        //  value={name}
        //  defaultValue={item.tennguoidung}
         onChangeText={(e) => setName(e)}
        label="Họ và Tên"
        autoCapitalize="words"
        activeValueColor="#6c63fe"
        activeBorderColor="#6c63fe"
        activeLabelColor="#6c63fe"
        passiveBorderColor="#bbb7ff"
        passiveLabelColor="#bbb7ff"
        passiveValueColor="#bbb7ff"
        placeholder = "abcsa"
      ></OutlineInput>
      <TextInput 
      placeholder = "abc"
      // value={name}
      defaultValue={item.tennguoidung}
      ></TextInput>
      <View style = {styles.inputdate}>
      <OutlineInput
        // maxLength = {0}
        value={item.namsinh}
        // onChangeText={(e: string) => setEmail(e)}
        label="Ngày-Tháng-Năm Sinh"
        // error = "true"
        // disabled
        autoCapitalize="words"
        activeValueColor="#6c63fe"
        activeBorderColor="#6c63fe"
        activeLabelColor="#6c63fe"
        passiveBorderColor="#bbb7ff"
        passiveLabelColor="#bbb7ff"
        passiveValueColor="#bbb7ff"/>
          <Icon style={styles.icon} name="calendar" size={25} onPress={() => showMode('date')}/> 

          {show && (
        <DateTimePicker testID="dataTimePicker" 
        value={date} 
        mode={mode} 
        is24Hour={true}
        display='default'
        onChange={onChange}/>
          )}
      </View>
      </View>
      <Text style={styles.text_gioi_tinh}>Giới Tính</Text>
      <View style={styles.gioi_tinh}>
      
      <View style={styles.containera}>
      <CheckBox
            checked = {nam}
            title={"Nam"}
            onPress = {() => setNam(!nam || setNam(false === setNu(true)))}
            
        />
      </View>
      <View style={styles.containeraa}>
      <CheckBox
            checked = {nu}
            checkedColor = 'red'
            title={"Nữ"}
            onPress = {() => setNu(!nu || setNu(true === setNam(false)))}
        />
      </View><View style={styles.containeraaa}>
      <CheckBox
            checked = {khac}
            checkedColor = '#6f6f6f'
            title={"Khác"}
            checkedTitle = {"B.đuê"}
            onPress = {() => setKhac(!khac)}
        />
      </View>
      </View>
      
      <View style = {styles.input}>
      <OutlineInput
         value={item.diachi}
         onChangeText={(e) => setDiachi(e)}
        label="Địa chỉ"
        autoCapitalize="words"
        activeValueColor="#6c63fe"
        activeBorderColor="#6c63fe"
        activeLabelColor="#6c63fe"
        passiveBorderColor="#bbb7ff"
        passiveLabelColor="#bbb7ff"
        passiveValueColor="#bbb7ff"
      ><TextInput></TextInput></OutlineInput>

      </View>
      
                <View style={styles.css_update}>
                  <TouchableOpacity style={styles.updates} onPress= {() => Alert.alert("Đã bấm vào nút cập nhật") === navigation.navigate("About") }>
                    <Text style={styles.textSign}>Cập Nhật</Text>
                  </TouchableOpacity>
                </View>

    </View>
   
    </View>

     )}
    />
     

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
    backgroundColor : "white",
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
     padding: 10,
     
    // width: 200
  },
  input: {
    
    // borderRadius : 10,
    // height: 40,
    // margin: 12,
    // borderWidth: 1,
    margin :  20,
    // padding: 10,
  },
  inputdate: {
    justifyContent: 'center',
    marginTop : 20
  },
  icon: {
    position: 'absolute',
    right: 20,
  },
  gioi_tinh: {
    flexDirection: "row", 
    borderRadius : 10,
    height: 75,
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderColor: "#6c63fe",
  },
  text_gioi_tinh: {
    color: "#6c63fe",
    fontSize: 15,
   fontWeight: "bold",
   marginLeft: 20
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },

  containera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  containeraa: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containeraaa: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#F5FCFF',
  },
  updates: {
    height: 40,
    width : 150,
    justifyContent: "center",
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: "#737373",
  },
  css_update: {
    alignItems: "center",
  },
});