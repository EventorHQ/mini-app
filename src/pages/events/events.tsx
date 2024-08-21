import { useGetOrgsQuery } from "@/api/orgs";
import EventCell from "@/components/event-cell";
import NearestEventBanner from "@/components/nearest-event-banner";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { dora } from "@/mockContent";
import { Event } from "@/types";
import { useBackButton } from "@telegram-apps/sdk-react";
import { List, Section } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EventsPage() {
  const { data: orgs, isLoading: isOrgsLoading } = useGetOrgsQuery();
  const navigate = useNavigate();
  const bb = useBackButton();
  const { setParams, setIsVisible } = useTabbarActions();

  const handleEventClick = (event: Event) => () => {
    navigate(`/events/${event.id}`);
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

  return (
    <List>
      <NearestEventBanner />
      <Section header="Мои мероприятия">
        <EventCell {...dora} onClick={handleEventClick(dora)} />
      </Section>
    </List>
  );
}
