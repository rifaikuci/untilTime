import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AddRoutine, DetailRoutine, FullRoutine, Home } from "./src";
import { getDeviceInfo } from "./util/deviceInfo";
import axios from 'axios';
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Root = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={Home} options={{ drawerLabel: "Ana sayfa", drawerLabelStyle: { fontWeight: '500' } }} />
      <Drawer.Screen name="FullRoutine" component={FullRoutine} options={{ drawerLabel: "Tüm rutinleri göster", drawerLabelStyle: { fontWeight: '500' } }} />
      <Drawer.Screen name="AddRoutine" component={AddRoutine} options={{ drawerLabel: "Yeni Bir Rutin Ekle", drawerLabelStyle: { fontWeight: '500' } }} />
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
          axios.defaults.headers = {
            'device-id': deviceInfo.deviceID,
            'app-version': deviceInfo.appVersion,
            'user-agent': deviceInfo.userAgent,
            'device-key': deviceInfo.deviceID,
            'platform': deviceInfo.systemName,
            'platform-version': deviceInfo.systemVersion,
            'brand-model': `${deviceInfo.deviceManufacturer}-${deviceInfo.model}`,
            'X-Forwarded-For': deviceInfo.ip,
            'mac-address': deviceInfo.macAddress,
          };

          setIsDeviceInfoLoaded(true);
        } else {
          console.error("Device ID could not be obtained.");
        }
      } catch (error) {
        console.error("An error occurred while obtaining device info:", error);
      }
    };

    // Sadece ilk render için çalıştır
    initializeApp().then(() => {});
  }, []);

  if (!isDeviceInfoLoaded) {
    // Başka bir yükleme ekranı görüntüleme ya da alternatif bir işlem yapabilirsiniz
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Home"}
      >
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name={"AddRoutine"} component={AddRoutine} />
        <Stack.Screen name={"DetailRoutine"} component={DetailRoutine} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
