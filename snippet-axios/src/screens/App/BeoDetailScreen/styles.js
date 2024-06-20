import { StyleSheet } from "react-native";
import { Colors, Fonts, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  personImage: {
    width: "80%",
    height: 250,
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    backgroundColor: Colors.WHITE,
    elevation: 10,
  },
  name: {
    alignSelf: "center",
    marginVertical: "2%",
    fontSize: TextSizes.SubHeading,
    fontFamily: Fonts.SemiBold,
  },

  viewPdfContainer: {
    width: 150,
    height: 70,
    alignSelf: "center",
    marginTop: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.darkBlue,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: "5%",
  },
  slide: {
    backgroundColor: "pink",
    paddingVertical: 10,
  },
  imageIconContainer: {
    backgroundColor: Colors.darkBlue,
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    position: "absolute",
    top: "82%",
    left: "80%",
  },
});

export default styles;
