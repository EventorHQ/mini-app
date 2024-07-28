import { useGetUsersQuery } from "@/api/queries";
import EventCell from "@/components/event-cell";
import NearestEventBanner from "@/components/nearest-event-banner";
import { dora } from "@/mockContent";
import { List, Section } from "@telegram-apps/telegram-ui";

export default function EventsPage() {
  const { data: users } = useGetUsersQuery();

  return (
    <List>
      <NearestEventBanner />
      <Section header="Мои мероприятия">
        <EventCell {...dora} />
      </Section>
      {users && <pre>{JSON.stringify(users, null, 2)}</pre>}
    </List>
  );
}
