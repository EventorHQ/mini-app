import { useGetOrgsQuery } from "@/api/orgs";
import Chevron16Icon from "@/components/ui/icons/chevron16";
import { useTabbar } from "@/hooks/use-tabbar";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { Cell, List, Placeholder, Section } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrganizationsPage() {
  const { data, isLoading } = useGetOrgsQuery();
  const { isVisible } = useTabbar();
  const { setParams, setIsVisible } = useTabbarActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVisible) {
      setIsVisible(true);
    }

    setParams({
      text: "Создать организацию",
      isVisible: true,
      disabled: false,
      onClick: () => {
        navigate("/organizations/new");
      },
    });
  }, []);

  if (isLoading) {
    return <Placeholder description="Загрузка..." />;
  }

  return (
    <List>
      {data && data.length > 0 ? (
        <Section
          header="Мои организации"
          footer={
            <Section.Footer centered>{data.length} организаций</Section.Footer>
          }
        >
          {data.map((org) => (
            <Cell key={org.id} after={<Chevron16Icon />}>
              {org.title}
            </Cell>
          ))}
        </Section>
      ) : (
        <Placeholder description="Вы не принадлежите ни к одной организации">
          {/* Пусто */}
        </Placeholder>
      )}
    </List>
  );
}
