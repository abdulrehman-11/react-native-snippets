import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "5%",
    marginVertical: "5%",
  },
  logo: {
    alignSelf: "center",
    marginTop: "5%",
  },
  label: {
    alignSelf: "center",
    marginTop: "5%",
    color: Colors.commonButtonGradient2,
    fontSize: TextSizes.LargeHeading,
  },
  textInputContainer: {
    borderWidth: 1,
    flexDirection: "row",
    alignSelf: "center",
    marginTop: "5%",
    borderRadius: 25,
    width: "80%",
    paddingLeft: "5%",
  },
  textInput: {
    width: Platform.OS === "ios" ? "71%" : "72%",
    height: "100%",
    color: Colors.black,
  },
  contact: {
    color: Colors.red,
    marginLeft: "5%",
    marginTop: "5%",
    fontFamily: Fonts.SemiBold,
  },
  agreeText: {
    marginLeft: "3%",
    width: "90%",
    textAlign: "left",
  },
});

export default styles;
