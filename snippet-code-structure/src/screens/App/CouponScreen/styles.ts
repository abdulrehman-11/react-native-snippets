import { StyleSheet } from "react-native";
import { Colors } from "../../../common";

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    marginLeft: "auto",
    alignItems: "center",
  },
  img: {
    width: 100,
    height: 100,
  },
  inputContainer: { marginVertical: 30 },
});

export default styles;
