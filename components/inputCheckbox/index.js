import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "./style";

const InputCheckbox = ({ label, onChange,labelStyle, value }) => {
  const [isChecked, setChecked] = useState(value);

  const handleToggle = () => {
    setChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <TouchableOpacity onPress={handleToggle}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={style.content(isChecked)}
        />
        <Text style={[ style.labelText, {...labelStyle}]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default InputCheckbox;
