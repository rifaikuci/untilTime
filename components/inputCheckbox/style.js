import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

export default StyleSheet.create({

  content : (isChecked) => ({
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: isChecked ? COLORS.primary : "transparent",
    marginRight: 10,
  }),

  labelText : {
    color: COLORS.secondary,
    fontWeight: "500"
  }

});
