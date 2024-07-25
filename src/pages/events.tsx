import EventCell from "@/components/event-cell";
import NearestEventBanner from "@/components/nearest-event-banner";
import { dora } from "@/mockContent";
import { List, Section } from "@telegram-apps/telegram-ui";

export default function EventsPage() {
  return (
    <List>
      <NearestEventBanner />
      <Section header="Мои мероприятия">
        <EventCell {...dora} />
      </Section>
    </List>
  );
}
