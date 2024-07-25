import Building24Icon from "@/components/ui/icons/building24";
import Logo24Icon from "@/components/ui/icons/logo24";
import Person24Icon from "@/components/ui/icons/person24";
import { cn, getBottomPadding } from "@/lib/utils";
import { Button, Tabbar as TabbarView } from "@telegram-apps/telegram-ui";
import { useLocation, useNavigate } from "react-router-dom";

function getSelectedTab(pathname: string) {
  if (pathname.includes("events")) {
    return "events";
  } else if (pathname.includes("organizations")) {
    return "organizations";
  } else if (pathname.includes("profile")) {
    return "profile";
  }

  return null;
}

export default function Tabbar() {
  const { pathname } = useLocation();
  const selectedTab = getSelectedTab(pathname);
  const navigate = useNavigate();

  if (!selectedTab) return null;

  const handleClick = (path: string) => () => {
    navigate(path);
  };

  return (
    <TabbarView>
      <div
        className={cn("flex w-full flex-col items-center", getBottomPadding())}
      >
        <div className="w-full flex items-center justify-center pt-4 pb-2 px-5">
          <Button size="l" className="w-full">
            Создать мероприятие
          </Button>
        </div>
        <div className="flex w-full justify-evenly">
          <TabbarView.Item
            selected={selectedTab === "events"}
            text="Мероприятия"
            onClick={handleClick("/events")}
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
            selected={selectedTab === "organizations"}
            text="Организации"
            onClick={handleClick("/organizations")}
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
      </div>
    </TabbarView>
  );
}
