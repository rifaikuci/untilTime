import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

export default StyleSheet.create({

  body : {
    marginHorizontal: 16,
  },

  labelText : {
    marginBottom: 10
  },

  content : {
    borderWidth:1,
    padding: 10,
    borderRadius: 5,
    borderColor: COLORS.gray


  },

  textInput : {
    padding: 5
  }

});
