
import { StyleSheet, Text, View  , Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignOut({navigation}) {
    const logout = async() => {
        await AsyncStorage.removeItem('luutaikhoan')
        navigation.navigate('Splash')
    }
    logout();
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
