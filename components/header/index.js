
import style from "./style";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import { COLORS } from "../../constants/theme";
import React from "react";
const Header = ({title}) => {

  return (
    <View style={style.headerContent}>
      <View style={style.headerBackIconContent}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={25} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={style.headerContentText}>
        <Text  style={style.headerText}>
          {title}
        </Text>
      </View>

    </View>
  )
}

export default Header;
