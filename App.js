import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserScreen from './src/Register';
import DashboardScreen from './src/Dashbord';
import LognIn from './src/LognIn';
import PhoneSignIn from './src/PhoneOtp';
import RealDataBase from './src/RealDataBase';
import CloudStorage from './src/CloudStorage';
import Home from './src/Home';
import MyTabs from './src/TabNavigation';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* <Stack.Screen name="UserScreen" component={UserScreen} />
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          <Stack.Screen name="LognIn" component={LognIn} /> */}
          {/* <Stack.Screen name="PhoneSignIn" component={PhoneSignIn} /> */}
          {/* <Stack.Screen name="RealDataBase" component={RealDataBase} /> */}
          {/* <Stack.Screen name="CloudStorage" component={CloudStorage} /> */}
          {/* <Stack.Screen name="Home" component={Home} /> */}
          <Stack.Screen name="Mytab" component={MyTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

// import React from 'react';
// import Home from './src/Home';

// const App = () => {
//   return <Home />;
// };

// export default App;
