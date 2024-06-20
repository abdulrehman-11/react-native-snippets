import { StyleSheet } from "react-native";
import { Colors, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  container: {},
  otpText: {
    marginTop: "5%",
    textAlign: "center",
    marginHorizontal: "5%",
  },
  codeFiledRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: "auto",
    marginRight: "auto",
    color: Colors.blue,
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Colors.blue,
    borderBottomWidth: 2,
  },
  cellText: {
    color: Colors.blue,
    fontSize: TextSizes.Heading,
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: Colors.blue,
    borderBottomWidth: 2,
  },
  resendCodeContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "10%",
  },
});

export default styles;
