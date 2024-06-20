import { StyleSheet } from "react-native";
import { Colors, Fonts, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "5%",
  },
  mainText: {
    alignSelf: "center",
    marginTop: "15%",
    fontSize: TextSizes.ExtraLargeHeading,
    fontFamily: Fonts.SemiBold,
    color: Colors.darkBlue,
  },
  forgotPassword: {
    color: Colors.grey,
    alignSelf: "flex-end",
    marginRight: "5%",
    marginTop: "2%",
    fontSize: TextSizes.midMediumText,
    marginBottom: "5%",
  },
});

export default styles;
