import { StyleSheet } from "react-native";
import { Colors, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1.5,
    height: 33,
    width: "32%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.WHITE,
    marginTop: 5,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  name: { fontSize: TextSizes.mediumText, color: Colors.blue },
  icon: {
    color: Colors.blue,
  },
});

export default styles;
