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
import { Ticket } from "@/components/ticket";
import { bindColor } from "@/lib/bind-color";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export const App: FC = () => {
  const { platform } = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    // Additional request fixes background issue on iOS
    postEvent("web_app_request_theme");
  }, []);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    if (viewport) {
      document.body.style.height = `${viewport.height * 1.5}px`;
    }
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  useEffect(() => {
    miniApp.setHeaderColor("secondary_bg_color");
    bindColor("--tg-theme-bg-tertiary", miniApp.isDark ? "#2a2a2a" : "#f4f4f7");
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoot
        appearance={miniApp.isDark ? "dark" : "light"}
        platform={IOS_PLATFORMS.includes(platform) ? "ios" : "base"}
      >
        <TabbarProvider>
          <Router />
        </TabbarProvider>
        <Ticket />
      </AppRoot>
    </QueryClientProvider>
  );
};
