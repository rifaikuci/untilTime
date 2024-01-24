import { StyleSheet } from "react-native";
import { SIZES } from "../../constants/theme";

export default StyleSheet.create({
  topViewContainer: {
    marginHorizontal: SIZES.baseContainerHorizontalMargin,
  },

  inputContent: {
    marginTop: 30
  },

  checkboxContent :{
    marginHorizontal: SIZES.baseContainerHorizontalMargin,
    marginVertical:20
  },

  sendButton: {
    backgroundColor: "red",
    color:"white"
  }

});
