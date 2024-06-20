import { StyleSheet } from "react-native";
import { Colors, Fonts, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  noText: {
    alignSelf: "center",
    marginTop: "50%",
    fontSize: TextSizes.SubHeading,
    color: Colors.darkBlue,
    fontFamily: Fonts.SemiBold,
  },
});

export default styles;
