import { ReadEvent, useGetEventsQuery } from "@/api/events";
import { useGetOrgsQuery } from "@/api/orgs";
import { DateString } from "@/components/date";
import EventCell from "@/components/event-cell";
import QR24Icon from "@/components/ui/icons/qr24";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { useBackButton } from "@telegram-apps/sdk-react";
import {
  Banner,
  List,
  Section,
  Image,
  Button,
  Placeholder,
} from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { useNavigate } from "@/hooks/use-navigate";

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
      <Banner
        type="section"
        callout="Ближайшее мероприятие"
        header={events[0].title}
        subheader={<DateString date={events[0].start_date} />}
        before={<Image src={events[0].cover_img} />}
      >
        <Button size="s" before={<QR24Icon />}>
          Билет
        </Button>
      </Banner>
      {events.length > 0 ? (
        <Section header="Мои мероприятия">
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
