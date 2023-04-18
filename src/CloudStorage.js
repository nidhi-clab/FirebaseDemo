import React, {useEffect} from 'react';
import {View, Button} from 'react-native';

import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const CloudStorage = () => {
  // create bucket storage reference to not yet existing image
  const reference = storage().ref('black-t-shirt-sm.png');

  return <View></View>;
};

export default CloudStorage;
