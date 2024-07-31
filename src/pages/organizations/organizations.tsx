import { useTabbar } from "@/hooks/use-tabbar";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { List, Placeholder } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrganizationsPage() {
  const { isVisible } = useTabbar();
  const { setParams, setIsVisible } = useTabbarActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVisible) {
      setIsVisible(true);
    }

    setParams({
      text: "Создать",
      isVisible: true,
      disabled: false,
      onClick: () => {
        navigate("/organizations/new");
      },
    });
  }, []);

  return (
    <List>
      <Placeholder description="Вы не принадлежите ни к одной организации">
        {/* Пусто */}
      </Placeholder>
    </List>
  );
}
