import { TabbarActionsContext } from "@/store/tabbar-context";
import { useContext } from "react";

export const useTabbarActions = () => {
  const value = useContext(TabbarActionsContext);
  if (!value) {
    throw new Error(
      "useTabbarActions must be used within a TabbarActionsProvider"
    );
  }

  return value;
};
