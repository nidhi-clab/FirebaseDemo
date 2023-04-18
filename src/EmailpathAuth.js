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

const EmailPathAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [verifyEmail, setVerifyEmail] = useState('');

  const createUser = () => {
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
  };
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

  const forgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email.trim())
      .then(() => {
        alert('password reset email sent');
      })
      .catch(function (e) {
        alert(e);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={txt => setEmail(txt)}
        placeholderTextColor="#000"
        style={styles.Textinput}
      />
      {/* <TextInput
        placeholder="Verify Email"
        value={verifyEmail}
        onChangeText={txt => setVerifyEmail(txt)}
        placeholderTextColor="#000"
        style={styles.Textinput}
      /> */}
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
          // createUser();
          // verifyEmail();
        }}>
        <Text style={styles.Text}>Sign-in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          forgotPassword();
        }}>
        <Text style={styles.Text}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailPathAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Textinput: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    color: 'black',
  },
  Button: {
    width: '90%',
    height: 50,
    backgroundColor: 'pink',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  Text: {
    color: '#000',
    fontSize: 20,
  },
});
