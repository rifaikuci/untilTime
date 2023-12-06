import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

export default StyleSheet.create({
  topViewContainer: {
    marginHorizontal: SIZES.baseContainerHorizontalMargin
  },

  cardListContainer: {
    marginTop: 5,
    marginBottom: SIZES.height /10,
    flexDirection: "column",
  },

  mainTopContainer: {
    width: '100%',
    alignItems: "center"
  },

  mainTopText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary
  },

  cardItemContainer : {

    borderColor: COLORS.secondary,
    borderWidth: 1.5,
    marginVertical: 5,
    borderRadius: 5,
    height: SIZES.height /5,

  },

  cardItemContentTopBar :{
    flex : 8,
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 10,
    marginTop: 15,
  },

  cardItemContentTopDesc : {
    flex: 7,
  },

  cardItemContentTopText: {
    fontSize: 18,
    color: COLORS.secondary,
    fontWeight: "500"
  },

  cardItemContentTopIcon : {
    flex: 1,
    flexDirection: "row-reverse"
  },

  cardItemTimerView: {
    alignItems: "center"
  },

  cardItemTimerText : {
    fontSize: 50,
    color: COLORS.primary
  }


});
