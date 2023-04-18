import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';

const Home = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [city, setCity] = useState([]);
  const [cityList, setCityList] = useState([]);
  console.log('====================================');
  console.log('cityList', cityList);
  console.log('====================================');

  useEffect(() => {
    firestore()
      .collection('Cities')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
          data.push({...documentSnapshot.data(), id: documentSnapshot.id});
          setCityList(data);
        });
      });
  }, [cityList]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="name"
        placeholderTextColor="black"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="age"
        placeholderTextColor="black"
        value={age}
        onChangeText={text => setAge(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="income"
        placeholderTextColor="black"
        value={income}
        onChangeText={text => setIncome(text)}
        keyboardType="numeric"
      />
      <View style={styles.input}>
        <Picker
          selectedValue={city}
          label="city"
          onValueChange={itemValue => setCity(itemValue)}>
          {cityList.map(item => (
            <Picker.Item key={item.id} label={item.city} value={item.id} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: 'black',
    marginTop: 30,
    justifyContent: 'center',
  },
});
