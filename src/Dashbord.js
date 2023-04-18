import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function DashboardScreen() {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  //   useEffect(() => {
  //     firebase
  //       .firestore()
  //       .collection('users')
  //       .doc(firebase.auth().currentUser.uid)
  //       .get()
  //       .then(snapshot => {
  //         if (snapshot.exists) {
  //           setUsername(snapshot.data());
  //         } else {
  //           console.log('User Dose Not Exist');
  //         }
  //       });
  //   }, []);

  const handleLogout = () => {
    // firebase.auth().signOut();
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('LognIn');
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'black'}}>Dashboard Screen</Text>
      {/* <Text style={{fontSize: 16, color: 'black', marginTop: 10}}>
        Hello, {username.username}
      </Text> */}
      <TouchableOpacity style={styles.Button} onPress={handleLogout}>
        <Text style={styles.Text}>Log Out</Text>
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
  Button: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  Text: {
    color: '#fff',
    fontSize: 20,
  },
});
