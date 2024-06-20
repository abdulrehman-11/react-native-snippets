import { StyleSheet } from "react-native";
import { Colors, Fonts, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  personImage: {
    width: "80%",
    height: 250,
    alignSelf: "center",
    borderRadius: 10,
  },
  name: {
    fontSize: TextSizes.SubHeading,
    color: Colors.darkBlue,
    marginRight: "5%",
    fontFamily: Fonts.SemiBold,
    textDecorationLine: "underline",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "5%",
    alignSelf: "center",
  },
  locationContainer: {
    flexDirection: "row",
    marginLeft: "5%",
  },
  locationSubContainer: { width: "82%", marginLeft: "2%" },
  title: {
    color: Colors.darkBlue,
    fontFamily: Fonts.SemiBold,
    fontSize: TextSizes.mediumText,
  },
});

export default styles;
