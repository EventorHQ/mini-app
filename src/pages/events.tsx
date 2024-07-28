import { useGetUsersQuery } from "@/api/queries";
import EventCell from "@/components/event-cell";
import NearestEventBanner from "@/components/nearest-event-banner";
import { dora } from "@/mockContent";
import { Event } from "@/types";
import { List, Section } from "@telegram-apps/telegram-ui";
import { useNavigate } from "react-router-dom";

export default function EventsPage() {
  const { data: users } = useGetUsersQuery();
  const navigate = useNavigate();

  const handleEventClick = (event: Event) => () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <List>
      <NearestEventBanner />
      <Section header="Мои мероприятия">
        <EventCell {...dora} onClick={handleEventClick(dora)} />
      </Section>
      {users && <pre>{JSON.stringify(users, null, 2)}</pre>}
    </List>
  );
}
