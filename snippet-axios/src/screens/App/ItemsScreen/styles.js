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
  filterContainer: {
    width: 100,
    height: 50,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginLeft: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    marginBottom: "1%",
  },
});

export default styles;
