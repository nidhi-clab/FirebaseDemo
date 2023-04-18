import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const LongIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignIn = () => {
    auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then(res => {
        console.log(res);
        Alert.alert('user logged in' + JSON.stringify(res));
      })
      .catch(err => {
        console.log(err);
      });
    navigation.navigate('DashboardScreen');
  };

  const forgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email.trim())
      .then(() => {
        alert('password reset email sent');
      })
      .catch(function (e) {
        alert(e);
        console.log(e);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'black'}}>LongIn Screen</Text>
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={txt => setEmail(txt)}
        placeholderTextColor="#000"
        style={styles.Textinput}
      />
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={txt => setPassword(txt)}
        placeholderTextColor="#000"
        style={styles.Textinput}
      />
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          userSignIn();
        }}>
        <Text style={styles.Text}>Long-in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          forgotPassword();
        }}>
        <Text style={{fontSize: 20, color: 'black'}}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LongIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Textinput: {
    width: '90%',
    height: 40,
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    color: 'black',
  },
  Button: {
    width: '90%',
    height: 50,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  Text: {
    color: '#fff',
    fontSize: 20,
  },
});
