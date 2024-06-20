import { StyleSheet } from "react-native";
import { Colors, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  container: {
    width: "60%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    alignSelf: "center",
  },
  title: {
    fontSize: TextSizes.SubHeading,
    color: Colors.commonButtonGradient2,
  },
  gradientButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
});
export default styles;
