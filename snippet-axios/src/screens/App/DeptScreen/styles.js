import { StyleSheet } from "react-native";
import { Colors, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
    paddingLeft: 10,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    color: Colors.WHITE,
    fontSize: TextSizes.mediumText,
  },
  btnStyles: {
    width: "70%",
    marginTop: 20,
  },
  cardTxt: {
    marginLeft: 10,
  },
});

export default styles;
