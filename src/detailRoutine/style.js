import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

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
  },


  radioInputs: {
    marginHorizontal: SIZES.baseContainerHorizontalMargin,
    marginTop: 5,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
    padding: 4,

  },
  radio: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius :10
  },
  selectedRadio: {
    backgroundColor: COLORS.primary,
    fontWeight: "600",
  },
  name: {
    fontSize: 15,
    color: COLORS.white,
  },

  cardItemContainer: {
    marginTop:20
  },

  listItemHeader :{
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderWidth:1,
    borderColor: COLORS.lightGray
  },

  listItemHeaderText : {
    color: COLORS.white,
    fontSize: 16,
  },


  detailTimesContainer : {
    borderRadius: 10,
    marginTop:5,
    height: '62%', // Ekranın tamamına yayılacak şekilde ayarlandı


  },

  contentContainerStyle: {

    flexGrow: 1,
    justifyContent: 'flex-end',
  },

  subItemContentContainer: {
    flexDirection : 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.darkgray,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 5,
    padding:10,
    marginLeft:SIZES.width / 30
  },

  subItemText : {
    color: COLORS.white,
    fontWeight: '400'
  }



});
