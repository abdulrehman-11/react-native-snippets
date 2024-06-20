import { StyleSheet } from "react-native";
import { Fonts, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  HeaderText: {
    fontSize: TextSizes.SubHeading,
    marginLeft: "5%",
    fontFamily: Fonts.SemiBold,
  },
  RegularText: {
    fontSize: TextSizes.mediumText,
    margin: "5%",
  },
});

export default styles;
