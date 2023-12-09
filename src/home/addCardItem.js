import { Text, TouchableOpacity, View } from "react-native";
import style from "./style";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../../constants/theme";

const AddCardItem = ({ title, handleAddItem }) => {

  return (

    <TouchableOpacity style={style.cardItemContainer} onPress={handleAddItem}>

      <View style={style.cardItemContentTopBar}>

        <View style={style.cardItemContentTopDesc}>
          <Text style={style.cardItemContentTopText}>
            {title}
          </Text>
        </View>
      </View>

      <View style={style.iconContainer}>
        <Icon
          name="add-chart"
          size={100}
          color={COLORS.primary}
          style={style.iconItem}
        />

      </View>

    </TouchableOpacity>);
};

export default AddCardItem;
