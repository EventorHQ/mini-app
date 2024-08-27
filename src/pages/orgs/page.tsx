import { useGetOrgsQuery } from "@/api/orgs";
import OrganizationCell from "@/components/organization-cell";
import { useTabbar } from "@/hooks/use-tabbar";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { List, Placeholder, Section } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { useNavigate } from "@/hooks/use-navigate";

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
        navigate("/orgs/create");
      },
    });
  }, []);

  if (isLoading) {
    return <Placeholder description="Загрузка..." />;
  }

  const handleItemClick = (id: number) => () => {
    navigate(`/orgs/${id}`);
  };

  return (
    <List>
      {data && data.length > 0 ? (
        <Section
          header="Мои организации"
          footer={
            <Section.Footer centered>{data.length} организаций</Section.Footer>
          }
        >
          {data.map((item) => (
            <OrganizationCell
              key={item.organization.id}
              organization={item.organization}
              role={item.role}
              onClick={handleItemClick(item.organization.id)}
            />
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
