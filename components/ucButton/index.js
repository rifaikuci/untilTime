import style from "./style";
import { TouchableOpacity, View,Text } from "react-native";
import React from "react";

const UcButton = ({title, handlePress, textStyle, contentStyle}) => {

  return (
    <View style={{ alignItems: "center" }}>

        <TouchableOpacity
          style={[style.content, { ...contentStyle }]}
          onPress={handlePress}
        >
          <Text
            style={[style.buttonText, { ...textStyle }]} >
            {title}
          </Text>
        </TouchableOpacity>

    </View>
  );
};

export default UcButton;
