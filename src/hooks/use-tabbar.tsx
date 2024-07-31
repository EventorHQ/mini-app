import { TabbarContext } from "@/store/tabbar-context";
import { useContext } from "react";

export const useTabbar = () => {
  const value = useContext(TabbarContext);
  if (!value) {
    throw new Error("useTabbar must be used within a TabbarProvider");
  }

  return value;
};
