import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../common";

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
  },
  img: {
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius: 50,
    backgroundColor: "white",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
    textAlign: "center",
  },
  token: {
    fontSize: 18,
    fontFamily: Fonts.SemiBold,
    color: Colors.primary,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  price: {
    fontSize: 30,
    fontWeight: "600",
    color: Colors.darkSapphire2,
    fontFamily: Fonts.SemiBold,
  },
  expiry: {
    fontSize: 12,
    fontFamily: Fonts.SemiBold,
  },
  imgView: {
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
  },
  modalContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
  },
  gameImage: { width: 50, height: 50, marginRight: 10, borderRadius: 10 },
  mainContainer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5,
  },
  selectedName: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 5,
  },
  modalInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default styles;
