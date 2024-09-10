import { ReadEvent, useGetEventsQuery } from "@/api/events";
import { useGetOrgsQuery } from "@/api/orgs";
import EventCell from "@/components/event-cell";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { useBackButton } from "@telegram-apps/sdk-react";
import { List, Section, Placeholder } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { useNavigate } from "@/hooks/use-navigate";
import EventBanner from "@/components/event-banner";

export default function EventsPage() {
  const { data: orgs, isLoading: isOrgsLoading } = useGetOrgsQuery();
  const { data: events, isLoading: isEventsLoading } = useGetEventsQuery();
  const navigate = useNavigate();
  const bb = useBackButton();
  const { setParams, setIsVisible } = useTabbarActions();

  const handleEventClick = (event: ReadEvent) => () => {
    navigate(`/events/${event.event_id}`);
  };

  useEffect(() => {
    setIsVisible(true);
    bb.hide();
  }, []);

  useEffect(() => {
    if (!isOrgsLoading && orgs && orgs.length > 0) {
      setParams({
        isVisible: true,
        text: "Создать мероприятие",
        onClick: () => {
          navigate("/events/create");
        },
      });
    }
  }, [orgs, isOrgsLoading]);

  if (isEventsLoading || !events) {
    return <div>Loading...</div>;
  }

  if (events.length === 0) {
    if (!isOrgsLoading && orgs && orgs.length > 0) {
      <List>
        <Placeholder
          header="Тут пусто"
          description="У Вас пока нет мероприятий, на которые вы зарегистрировались или создали. Давайте это исправим?"
        ></Placeholder>
      </List>;
    }
    return (
      <List>
        <Placeholder
          header="Тут пусто"
          description="У Вас пока нет мероприятий, на которые вы зарегистрировались"
        ></Placeholder>
      </List>
    );
  }

  return (
    <List>
      <EventBanner event={events[0]} />
      {events.length > 0 ? (
        <Section header="Мои мероприятия" className="mb-28">
          {events.map((event) => (
            <EventCell
              key={event.event_id}
              event={event}
              onClick={handleEventClick(event)}
            />
          ))}
        </Section>
      ) : (
        <Section.Footer centered>Нет мероприятий</Section.Footer>
      )}
    </List>
  );
}
