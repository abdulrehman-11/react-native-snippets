import { StyleSheet } from "react-native";
import { Colors, Fonts, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  valuesContainer: {
    paddingLeft: "10%",
    width: "80%",
    alignSelf: "center",
    marginVertical: "1%",
  },
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
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: "5%",
    alignSelf: "center",
    paddingHorizontal: "5%",
  },
  title: {
    color: Colors.darkBlue,
    fontFamily: Fonts.SemiBold,
    fontSize: TextSizes.mediumText,
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
    left: "65%",
  },
});

export default styles;
