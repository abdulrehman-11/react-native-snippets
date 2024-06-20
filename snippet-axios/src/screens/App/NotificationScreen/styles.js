import { StyleSheet } from "react-native";

import { Colors, Fonts, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  clearAllContainer: {
    backgroundColor: Colors.darkBlue,
    width: "20%",
    alignSelf: "flex-end",
    marginRight: "5%",
    borderRadius: 10,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  clearAll: {
    color: Colors.WHITE,
    fontSize: TextSizes.smallText,
  },
  noText: {
    alignSelf: "center",
    marginTop: "50%",
    fontSize: TextSizes.SubHeading,
    color: Colors.darkBlue,
    fontFamily: Fonts.SemiBold,
  },
});

export default styles;
