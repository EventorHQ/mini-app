import { Collapsible, CollapsibleContent } from "@/components/collapsible";
import Building24Icon from "@/components/ui/icons/building24";
import Logo24Icon from "@/components/ui/icons/logo24";
import Person24Icon from "@/components/ui/icons/person24";
import { useTabbar } from "@/hooks/use-tabbar";
import { cn, getBottomPadding } from "@/lib/utils";
import { FixedLayout, Tabbar as TabbarView } from "@telegram-apps/telegram-ui";
import { useLocation } from "wouter";
import PseudoMainButton from "./pseudo-main-button";
import { useNavigate } from "@/hooks/use-navigate";

function getSelectedTab(pathname: string) {
  if (pathname === "/") {
    return "events";
  } else if (pathname.includes("orgs")) {
    return "orgs";
  } else if (pathname.includes("profile")) {
    return "profile";
  }

  return null;
}

export default function Tabbar() {
  const [pathname] = useLocation();
  const selectedTab = getSelectedTab(pathname);
  const navigate = useNavigate();
  const { isVisible, params } = useTabbar();

  if (!selectedTab) return null;

  const handleClick = (path: string) => () => {
    navigate(path);
  };

  return (
    <FixedLayout className="max-w-lg mx-auto">
      <nav className="flex w-full flex-col items-center">
        <Collapsible open={params.isVisible} className="flex w-full">
          <CollapsibleContent className="flex w-full">
            <PseudoMainButton {...params} padding={!isVisible} />
          </CollapsibleContent>
        </Collapsible>
        <Collapsible
          open={isVisible}
          className={cn(
            "w-full surface",
            params.isVisible ? "" : "custom-navbar",
            isVisible && getBottomPadding()
          )}
        >
          <CollapsibleContent className="w-full">
            <div className="flex w-full justify-evenly">
              <TabbarView.Item
                selected={selectedTab === "events"}
                text="Мероприятия"
                onClick={handleClick("/")}
              >
                <Logo24Icon
                  fillBody={
                    selectedTab === "events"
                      ? "var(--tgui--button_color)"
                      : "var(--tgui--secondary_hint_color)"
                  }
                  fillBars={
                    selectedTab === "events"
                      ? "var(--tgui--button_color)"
                      : "var(--tgui--secondary_hint_color)"
                  }
                  fillStar={"var(--tg-theme-button-text-color)"}
                />
              </TabbarView.Item>
              <TabbarView.Item
                selected={selectedTab === "orgs"}
                text="Организации"
                onClick={handleClick("/orgs")}
              >
                <Building24Icon />
              </TabbarView.Item>
              <TabbarView.Item
                selected={selectedTab === "profile"}
                text="Профиль"
                onClick={handleClick("/profile")}
              >
                <Person24Icon />
              </TabbarView.Item>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </nav>
    </FixedLayout>
  );
}
