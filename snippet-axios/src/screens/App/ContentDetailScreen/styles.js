import { StyleSheet } from "react-native";
import { TextSizes, Colors } from "../../../common";

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    fontSize: TextSizes.SubHeading,
  },
  container: {
    marginVertical: "5%",
    borderWidth: 1,
    width: "95%",
    alignSelf: "center",
    paddingVertical: "2%",
    borderRadius: 10,
    borderColor: Colors.darkBlue,
  },
  viewPdfContainer: {
    width: 100,
    height: 50,
    alignSelf: "center",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.darkBlue,
    borderRadius: 10,
  },
});

export default styles;
