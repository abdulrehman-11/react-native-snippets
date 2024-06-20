export type Font =
  | "Regular"
  | "Medium"
  | "SemiBold"
  | "Bold"
  | "ExtraBold"
  | "Light";

const fontFamilies: Record<Font, string> = {
  Regular: "Poppins-Regular",
  Medium: "Poppins-Medium",
  SemiBold: "Poppins-SemiBold",
  Bold: "Poppins-Bold",
  ExtraBold: "Poppins-ExtraBold",
  Light: "Poppins-Light",
};

export default fontFamilies;
