import { StyleSheet } from "react-native";
import { Colors, Fonts, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  noText: {
    alignSelf: "center",
    fontSize: TextSizes.SubHeading,
    color: Colors.darkBlue,
    fontFamily: Fonts.SemiBold,
  },
  noGameContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  selectedOption: {
    borderBottomColor: Colors.darkBlue,
    borderBottomWidth: 3,
  },
  selectedOptionText: {
    color: Colors.blue,
    fontSize: TextSizes.SubHeading,
  },
});

export default styles;
