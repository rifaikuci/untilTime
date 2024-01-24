import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

export default StyleSheet.create({

  content : {
    backgroundColor: COLORS.primary,
    width: SIZES.width /2,
    borderRadius: 8
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.white,
    textAlign: "center",
    padding: 5
  }

});
