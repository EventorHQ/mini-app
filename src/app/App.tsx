import { TabbarProvider } from "@/store/tabbar-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  postEvent,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { type FC, useEffect } from "react";
import Router from "./routing/router";
import { IOS_PLATFORMS } from "@/config/config";

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
    postEvent("web_app_request_theme");
  }, []);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  useEffect(() => {
    miniApp.setHeaderColor("secondary_bg_color");
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoot
        appearance={miniApp.isDark ? "dark" : "light"}
        platform={IOS_PLATFORMS.includes(lp.platform) ? "ios" : "base"}
      >
        <TabbarProvider>
          <Router />
        </TabbarProvider>
        <div id="ticket-root"></div>
      </AppRoot>
    </QueryClientProvider>
  );
};
