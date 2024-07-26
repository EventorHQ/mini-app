import { MainButtonParams } from "@telegram-apps/sdk-react";
import { createContext, FC, PropsWithChildren, useMemo, useState } from "react";

export type PseudoMainButtonParams = Pick<
  MainButtonParams,
  "text" | "isVisible"
>;

type TabbarContextValue = {
  isVisible: boolean;
  params: PseudoMainButtonParams;
  setIsVisible: (isVisible: boolean) => void;
  setParams: (params: PseudoMainButtonParams) => void;
};

export const TabbarContext = createContext<TabbarContextValue | null>(null);

export const TabbarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isTabbarVisible, setIsTabbarVisible] = useState(true);
  const [params, setParams] = useState<PseudoMainButtonParams>({
    text: "",
    isVisible: false,
  });

  const value = useMemo(
    () => ({
      isVisible: isTabbarVisible,
      setIsVisible: setIsTabbarVisible,
      params,
      setParams,
    }),
    [isTabbarVisible, params]
  );

  return (
    <TabbarContext.Provider value={value}>{children}</TabbarContext.Provider>
  );
};
