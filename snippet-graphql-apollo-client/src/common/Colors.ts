export type Color =
  | "primary"
  | "primaryLight"
  | "grey"
  | "black"
  | "background"
  | "green"
  | "lightgrey"
  | "white"
  | "darkSapphire"
  | "gray"
  | "yellow"
  | "darkBlack"
  | "lightGray"
  | "disabled"
  | "darkSapphire2"
  | "darkSapphire4"
  | "darkSapphire7"
  | "blue"
  | "graySapphire"
  | "graySapphire5"
  | "neutral"
  | "neutral2"
  | "danger";

const Colors: Record<Color, string> = {
  primary: "#EA8F1E",
  primaryLight: "#FFE7C9",
  grey: "#9695A8",
  black: "#333333",
  background: "#FFF",
  green: "#68D373",
  lightgrey: "#E0E4E9",
  white: "#ffffff",
  darkSapphire: "#101625",
  gray: "#696969",
  yellow: "#FBBD00",
  darkBlack: "#000000",
  lightGray: "#C4C4C4",
  disabled: "#EFEFEF",
  darkSapphire2: "#1A2234",
  darkSapphire7: "#616E82",
  blue: "#12A5EC",
  graySapphire: "#EFF1F4",
  graySapphire5: "#E0E4E9",
  neutral: "#777E90",
  darkSapphire4: "#303D51",
  neutral2: "#23262F",
  danger: "#ff0505",
};

export default Colors;
