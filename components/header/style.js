import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

export default StyleSheet.create({
  headerContent: {
    flexDirection: "row",
  },

  headerBackIconContent: {
    flex: 1,
  },

  headerContentText: {
    marginHorizontal: SIZES.baseContainerHorizontalMargin,
    flex: 20,
    alignItems:"center"
  },

  headerText : {
    fontWeight: "bold",
    fontSize: 20,
    color: COLORS.primary
  },


});
