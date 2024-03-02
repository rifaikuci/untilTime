import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

export default StyleSheet.create({
  topViewContainer: {
    marginHorizontal: SIZES.baseContainerHorizontalMargin,
  },

  cardListContainer: {
    marginTop: 5,
    marginBottom: SIZES.height / 10,
    flexDirection: "column",
  },

  mainTopContainer: {
    width: "100%",
    alignItems: "center",
  },

  mainTopText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  cardItemContainer: {

    borderColor: COLORS.secondary,
    borderWidth: 1.5,
    marginVertical: 5,
    borderRadius: 5,
    height: SIZES.height / 4,

  },

  cardItemContentTopBar: {
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 10,
    marginTop: 15,
  },

  cardItemContentTopDesc: {
  },

  cardItemContentTopText: {
    fontSize: 18,
    color: COLORS.secondary,
    fontWeight: "500",
  },

  cardItemContentTopIcon: {
    flex: 1,
    flexDirection: "row-reverse",
  },

  cardItemTimerView: {
    alignItems: "center",
    marginTop: 15
  },

  cardItemTimerText: {
    fontSize: 50,
    color: COLORS.primary,
  },

  modalContent: {
    backgroundColor: COLORS.darkgray,
    borderRadius: 10
  },

  modalBody: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalCloseIconContent: {
    alignItems: "center",
    paddingRight: 15,
    paddingTop: 15

  },

  modalTitleContent: {
    alignItems: "center",
    paddingRight: 5,
    paddingTop: 10,
    paddingLeft: 35
  },

  modalTitle : {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 16,
    marginVertical: 10
  },

  choosenContent :{
    bu: "center",
    flexDirection: "column",
    marginTop: 30
  },

  choosenItem: {
    marginVertical: 10,
    marginLeft: 40
  },

  choosenItemText: {
    color: COLORS.lightGray2,
    fontSize: 15,
    fontWeight: "500"
  },

  iconContainer : {
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  iconItem: {
    marginHorizontal: 20
  }


});
