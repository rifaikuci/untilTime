/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { AddRoutine, Home } from "./src";






const Stack = createStackNavigator();


function App() {

  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'AddRoutine'}
      >
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="AddRoutine" component={AddRoutine}/>

      </Stack.Navigator>
    </NavigationContainer>

  );
}


export default App;
