import { Dispatch, SetStateAction, createContext } from "react";
import type { User, Shop } from "../types";

export const AuthContext = createContext<{
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}>({
  token: "",
  setToken: () => {},
  user: null,
  setUser: () => {},
});

export const LoaderContext = createContext<{
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}>({
  loading: false,
  setLoading: () => {},
});

export const LanguageContext = createContext<{
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}>({
  language: "",
  setLanguage: () => {},
});

export const ShopContext = createContext<{
  shop: Shop | null;
  setShop: Dispatch<SetStateAction<Shop | null>>;
}>({
  setShop: () => {},
  shop: null,
});
