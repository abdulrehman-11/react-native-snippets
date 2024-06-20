import { StyleSheet } from "react-native";
import { Colors, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  container1: {
    backgroundColor: Colors.dodgerblue,
    alignItems: "center",
    justifyContent: "center",
  },
  conatiner2: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  conatiner3: {
    flex: 1,
    alignItems: "center",
  },
  imageStyles: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginBottom: "5%",
  },
  txtStyles: {
    fontSize: TextSizes.LargeHeading,
    color: Colors.WHITE,
    fontWeight: "bold",
    marginVertical: 10,
  },
  txtStyles2: {
    fontSize: TextSizes.midMediumText,
  },
  pointsCountContainer: {
    borderColor: Colors.coinButtonBorder,
    borderWidth: 2,
    width: 90,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    marginBottom: 10,
  },
  txtStyles3: {
    fontWeight: "bold",
    fontSize: TextSizes.SubHeading,
    marginBottom: 10,
  },
  footerContainer: {
    backgroundColor: Colors.violet,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  txtStyles4: {
    color: Colors.WHITE,
  },
});

export default styles;
