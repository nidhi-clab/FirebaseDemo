import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';

const RealDataBase = () => {
  const [myData, setMyData] = useState(null);

  useEffect(() => {
    Database();
  }, []);

  const Database = async () => {
    try {
      const data = await database().ref('user/1').once('value');

      console.log(data);

      setMyData(data.val());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.Continer}>
      <View
        style={{
          alignSelf: 'center',
        }}>
        <Text style={styles.Text}>
          Name:- {myData ? myData.name : 'Loading...'}
        </Text>
        <Text style={styles.Text}>
          Lname:- {myData ? myData.lName : 'Loading...'}
        </Text>
        <Text style={styles.Text}>
          Age:- {myData ? myData.age : 'Loading...'}
        </Text>
        <Text style={styles.Text}>
          Class:- {myData ? myData.class : 'Loading...'}
        </Text>
        <Text style={styles.Text}>
          Work:- {myData ? myData.work : 'Loading...'}
        </Text>
        <Text style={styles.Text}>
          Phone:- {myData ? myData.number : 'Loading...'}
        </Text>
      </View>
    </View>
  );
};

export default RealDataBase;

const styles = StyleSheet.create({
  Continer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#98AFC7',
  },
  Text: {
    fontSize: 22,
    color: '#00008B',
  },
});
