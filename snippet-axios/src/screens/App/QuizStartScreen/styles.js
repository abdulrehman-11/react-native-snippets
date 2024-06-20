import { StyleSheet } from "react-native";
import { Colors, Fonts, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  headerContainer: {
    width: "75%",
    alignSelf: "center",
    borderBottomWidth: 3,
    borderBottomColor: Colors.grey,
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 15,
    marginBottom: "5%",
  },
  txtStyles: {
    textAlign: "center",
    fontSize: TextSizes.SubHeading,
  },
  imageStyles: {
    alignSelf: "center",

    marginVertical: "10%",
  },
  txtStyles2: {
    fontSize: TextSizes.mediumText,
    alignSelf: "center",
    marginTop: 10,
  },
  txtStyles3: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
    color: Colors.grey,
    fontSize: TextSizes.text,
  },
  description: {
    alignSelf: "center",
    marginVertical: "2%",
    color: Colors.blue,
  },
  quizTime: {
    alignSelf: "center",
    fontFamily: Fonts.SemiBold,
    color: Colors.darkBlue,
    marginBottom: "5%",
  },
});

export default styles;
