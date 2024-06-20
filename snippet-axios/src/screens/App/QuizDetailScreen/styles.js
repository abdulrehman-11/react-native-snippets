import { StyleSheet } from "react-native";
import { Colors, Fonts, TextSizes } from "../../../common";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  quizCountContainer: {
    borderColor: Colors.selected,
    borderWidth: 2,
    width: 120,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  pointsCountContainer: {
    borderColor: Colors.coinButtonBorder,
    borderWidth: 2,
    width: 80,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  mainImage: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  question: {
    alignSelf: "center",
    fontFamily: Fonts.SemiBold,
    fontSize: TextSizes.SubHeading,
    textAlign: "center",
    marginVertical: "5%",
  },
  optionContainer: {
    borderWidth: 1,
    marginVertical: 8,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  selectedContainer: {
    marginVertical: 8,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.selected,
  },
  viewPdfContainer: {
    width: 150,
    height: 70,
    alignSelf: "center",
    marginTop: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.darkBlue,
  },
});

export default styles;
