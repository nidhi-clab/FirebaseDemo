import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function UserScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = () => {
    auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
    navigation.navigate('DashboardScreen');
  };
  const verifyEmail = async () => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://fir-c2f19.firebaseapp.com',
          })
          .then(() => {
            alert('Verifiction Email Sent');
          })
          .catch(err => {
            alert(err.message);
            console.log(err);
          })
          .then(() => {
            firebase
              .firestore()
              .collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                email,
                password,
              });
          })
          .catch(err => {
            alert(err.message);
            console.log(err);
          });
      })
      .catch(err => {
        alert(err.message);
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{color: 'black', fontSize: 20}}>Create User Screen</Text>
      <TextInput
        style={styles.Textinput}
        placeholder="Username"
        placeholderTextColor="#000"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.Textinput}
        placeholder="Email"
        placeholderTextColor="#000"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.Textinput}
        placeholder="Password"
        placeholderTextColor="#000"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          verifyEmail();
          handleCreateUser();
        }}>
        <Text style={styles.Text}>Create User</Text>
      </TouchableOpacity>
    </View>
  );
}

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
