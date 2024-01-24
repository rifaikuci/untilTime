// InputText.js
import React, { useRef } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import style from "./style";

const InputText = ({ placeHolderText, textStyle, value, label, labelStyle, onChangeText }) => {
  const inputTextRef = useRef(null);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={style.body}
      onPress={() => inputTextRef.current.focus()}
    >
      {label ? (
        <Text style={[style.labelText, { ...labelStyle }]}>
          {label}
        </Text>
      ) : null}

      <View style={style.content}>
        <TextInput
          ref={inputTextRef}
          style={[style.textInput, { ...textStyle }]}
          placeholder={placeHolderText}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </TouchableOpacity>
  );
};

export default InputText;
