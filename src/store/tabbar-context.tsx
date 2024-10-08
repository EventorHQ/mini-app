import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";

export type PseudoMainButtonParams = {
  text: string;
  isVisible: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

type TabbarContextValue = {
  isVisible: boolean;
  params: PseudoMainButtonParams;
};

type TabbarActions = {
  setIsVisible: (isVisible: boolean) => void;
  setParams: (params: Partial<PseudoMainButtonParams>) => void;
};

export const TabbarContext = createContext<TabbarContextValue | null>(null);
export const TabbarActionsContext = createContext<TabbarActions | null>(null);

export const TabbarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isTabbarVisible, setIsTabbarVisible] = useState(true);
  const [params, setMBParams] = useState<PseudoMainButtonParams>({
    text: "",
    isVisible: false,
    onClick: undefined,
    disabled: false,
  });

  const setParams = useCallback((params: Partial<PseudoMainButtonParams>) => {
    setMBParams((prev) => ({ ...prev, ...params }));
  }, []);

  const value = useMemo(
    () => ({
      isVisible: isTabbarVisible,
      params,
    }),
    [isTabbarVisible, params]
  );

  const actions = useMemo(
    () => ({
      setIsVisible: setIsTabbarVisible,
      setParams,
    }),
    []
  );

  return (
    <TabbarContext.Provider value={value}>
      <TabbarActionsContext.Provider value={actions}>
        {children}
      </TabbarActionsContext.Provider>
    </TabbarContext.Provider>
  );
};
