import { useGetEventAdministrationQuery } from "@/api/events";
import { useNavigate } from "@/hooks/use-navigate";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { useBackButton } from "@telegram-apps/sdk-react";
import { Avatar, Cell, Input, List, Section } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { useParams } from "wouter";

export default function VisitorsPage() {
  const bb = useBackButton();
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetEventAdministrationQuery(+params.id);
  const navigate = useNavigate();
  const { setParams } = useTabbarActions();

  useEffect(() => {
    const handleClick = () => {
      navigate(`/events/${params.id}/details`);
    };

    setParams({
      isVisible: false,
    });

    bb.show();
    bb.on("click", handleClick);

    return () => {
      bb.off("click", handleClick);
    };
  }, []);

  if (!data || isLoading) {
    return (
      <List>
        <Input placeholder="Поиск" disabled />
        <Section header="Зарегистрировались">
          {[...Array(5)].map((_, index) => (
            <Cell
              key={`skeleton-${index}`}
              before={
                <div className="w-12 h-12 bg-tg-secondary-bg rounded-full" />
              }
              description={
                <div className="w-24 h-4 bg-tg-secondary-bg rounded" />
              }
            >
              <div className="w-32 h-5 bg-tg-secondary-bg rounded" />
            </Cell>
          ))}
        </Section>
        <Section.Footer centered>Загрузка...</Section.Footer>
      </List>
    );
  }

  return (
    <List>
      <Input placeholder="Поиск" />
      <Section header="Зарегистрировались">
        {data.all_visitors.length > 0 &&
          data.all_visitors.map((visitor) => (
            <Cell
              key={`visitor-${visitor.id}`}
              before={<Avatar src={visitor.photo_img} size={48} />}
              description={
                visitor.username ? (
                  `@${visitor.username}`
                ) : (
                  <span className="opacity-0">Username</span>
                )
              }
            >
              {visitor.first_name} {visitor.last_name}
            </Cell>
          ))}
      </Section>
      <Section.Footer centered>{data.total_visitors} человек</Section.Footer>
    </List>
  );
}
