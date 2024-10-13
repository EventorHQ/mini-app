import { ReadEvent } from "@/api/events";
import { Banner, Image, Button } from "@telegram-apps/telegram-ui";
import { DateString } from "./date";
import QR24Icon from "./ui/icons/qr24";
import { ticket } from "./ticket";
import { useNavigate } from "@/hooks/use-navigate";
import { Guard24Icon } from "./ui/icons/guard24";
import { useQRScan } from "@/hooks/use-qr-scanner";

export default function EventBanner({ event }: { event: ReadEvent }) {
  const navigate = useNavigate();
  const handleQRScan = useQRScan(event.event_id);

  return (
    <Banner
      type="section"
      callout="Ближайшее мероприятие"
      header={event.title}
      subheader={<DateString date={event.start_date} />}
      before={<Image src={event.cover_img} />}
    >
      {event.role === "visitor" ? (
        <Button
          size="s"
          before={<QR24Icon />}
          onClick={() =>
            ticket({
              id: `${event.event_id}`,
              title: event.title,
              date: new Date(event.start_date),
              location: event.location,
            })
          }
        >
          Билет
        </Button>
      ) : (
        <div className="flex gap-2 items-center">
          <Button
            size="s"
            before={<Guard24Icon />}
            onClick={() => navigate(`/events/${event.event_id}/details`)}
          >
            Управление
          </Button>
          <Button size="s" before={<QR24Icon />} onClick={handleQRScan}>
            Сканировать
          </Button>
        </div>
      )}
    </Banner>
  );
}
