import type { DrawerItem, Language } from "../types";
import Routes from "./Routes";
import LangKeys from "../i18n/translations/LangKeys";

export const DUMMY_DATA: string[] = [
  LangKeys.personalDetails,
  LangKeys.bankDetails,
];
export const MY_SHOP_DUMMY_DATA: string[] = [
  LangKeys.shopDetails,
  LangKeys.bankDetails,
];

export const COUPON_CREATE_DUMMY_DATA: string[] = [
  LangKeys.myCoupons,
  LangKeys.usedCoupons,
];

export const DUMMY_DATA_COUPON: string[] = [
  LangKeys.myCoupons,
  LangKeys.usedCoupons,
  LangKeys.buyCoupons,
];
export const WALLET_TABS: string[] = [
  LangKeys.myWallet,
  LangKeys.requestWithdrawl,
  LangKeys.pendingRequests,
];

export const DUMMY_DRAWER_ITEMS: DrawerItem[] = [
  {
    id: 1,
    img: require("../assets/images/Notebook.png"),
    title: LangKeys.myCoupons,
    route: Routes.CoupnsStack,
  },
  {
    id: 2,
    img: require("../assets/images/contactDrawer.png"),
    title: LangKeys.gamesHistory,
    route: Routes.GameHistoryScreen,
  },
  {
    id: 3,
    img: require("../assets/images/HeartDrawer.png"),
    title: LangKeys.favourites,
    route: Routes.FavouriteScreen,
  },
  {
    id: 4,
    img: require("../assets/images/contactDrawer.png"),
    title: LangKeys.myCards,
    route: Routes.CreditCardScreen,
  },
];

export const Languages: Language[] = [
  {
    id: "en-US",
    title: "English",
    label: "Eng",
  },
  {
    id: "jp",
    title: "日本語",
    label: "日本語",
  },
];
