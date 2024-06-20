import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    textAlign: "center",
    paddingHorizontal: "5%",
  },
  logo: {
    alignSelf: "center",
    width: 200,
    height: 200,
    marginTop: "15%",
  },
  text: {
    textAlign: "center",
  },
  upArrow: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginTop: Dimensions.get("screen").height - 550,
  },
});

export default styles;
