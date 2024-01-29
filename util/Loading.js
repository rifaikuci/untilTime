import React from "react";
import { Image, SafeAreaView, StatusBar } from "react-native";
import icons from "../constants/icons";
const Loading = () => {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#f5f5f5",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: StatusBar.currentHeight
    }}>
      <Image source={icons.loading} height={10} width={10} />
    </SafeAreaView>
  );
};

export default Loading;
