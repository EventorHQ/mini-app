import { TabbarProvider } from "@/store/tabbar-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { type FC, useEffect } from "react";
import Router from "./routing";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const App: FC = () => {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    miniApp.setHeaderColor("secondary_bg_color");
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoot
        appearance={miniApp.isDark ? "dark" : "light"}
        platform={
          ["macos", "ios", "web"].includes(lp.platform) ? "ios" : "base"
        }
      >
        <TabbarProvider>
          <Router />
        </TabbarProvider>
        <div id="ticket-root"></div>
      </AppRoot>
    </QueryClientProvider>
  );
};
