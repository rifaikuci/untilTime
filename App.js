/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AddRoutine, DetailRoutine, FullRoutine, Home } from "./src";
import { getDeviceInfo } from "./util/deviceInfo";
import axios from 'axios';
import { createDrawerNavigator } from "@react-navigation/drawer";

axios.defaults.baseURL = "https://rifaikuci.com/sabish/";
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  'X-Parse-Application-Id': 'LkGs9nAHLHxFk23S',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0'
};


getDeviceInfo().then(deviceInfo => {



}).catch()



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



const Root = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false}}>
      <Drawer.Screen name="Home" component={Home} options={{
        drawerLabel:"Ana sayfa",
        drawerLabelStyle: {  fontWeight: '500' }
      }}  />
      <Drawer.Screen name="FullRoutine" component={FullRoutine} options={{
        drawerLabel:"Tüm rutinleri göster",
        drawerLabelStyle: {  fontWeight: '500' }
      }}  />

      <Drawer.Screen name="AddRoutine" component={AddRoutine} options={{
        drawerLabel:"Yeni Bir Rutin Ekle",
        drawerLabelStyle: {  fontWeight: '500' }
      }}  />
    </Drawer.Navigator>
  );
}


function App() {
  const [isDeviceInfoLoaded, setIsDeviceInfoLoaded] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const deviceInfo = await getDeviceInfo();

        // Eğer deviceID başarıyla alındıysa
        if (deviceInfo.deviceID) {
          axios.defaults.headers['device-id'] = deviceInfo.deviceID;
          axios.defaults.headers['app-version'] = deviceInfo.appVersion;
          axios.defaults.headers['user-agent'] = deviceInfo.userAgent;
          axios.defaults.headers['device-key'] = deviceInfo.deviceID;
          axios.defaults.headers['platform'] = deviceInfo.systemName;
          axios.defaults.headers['platform-version'] = deviceInfo.systemVersion;
          axios.defaults.headers['brand-model'] = `${deviceInfo.deviceManufacturer}-${deviceInfo.model}`;
          axios.defaults.headers['X-Forwarded-For'] = deviceInfo.ip;
          axios.defaults.headers['mac-address'] = deviceInfo.macAddress;

          setIsDeviceInfoLoaded(true);
        } else {
          console.error("Device ID could not be obtained.");
        }
      } catch (error) {
        console.error("An error occurred while obtaining device info:", error);
      }
    };

    initializeApp().then(()=> {});
  }, []); // Sadece ilk render için çalıştır

  if (!isDeviceInfoLoaded) {
    return null; // ya da başka bir yükleme ekranı görüntüleyebilirsiniz
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Home"}
      >
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={"AddRoutine"} component={AddRoutine} />
        <Stack.Screen name={"DetailRoutine"} component={DetailRoutine} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


export default App;
