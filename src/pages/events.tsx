import EventCell from "@/components/event-cell";
import NearestEventBanner from "@/components/nearest-event-banner";
import { dora } from "@/mockContent";
import { Event } from "@/types";
import { useBackButton } from "@telegram-apps/sdk-react";
import { List, Section } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EventsPage() {
  const navigate = useNavigate();
  const bb = useBackButton();

  const handleEventClick = (event: Event) => () => {
    navigate(`/events/${event.id}`);
  };

  useEffect(() => {
    bb.hide();
  }, []);

  return (
    <List>
      <NearestEventBanner />
      <Section header="Мои мероприятия">
        <EventCell {...dora} onClick={handleEventClick(dora)} />
      </Section>
    </List>
  );
}
