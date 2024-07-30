import { dora } from "@/mockContent";
import { Banner, Button, Image } from "@telegram-apps/telegram-ui";
import { Ticket } from "./ticket";
import QR24Icon from "./ui/icons/qr24";

export default function NearestEventBanner() {
  return (
    <>
      <Banner
        type="section"
        callout="Ближайшее мероприятие"
        header={dora.title}
        subheader={dora.date}
        before={<Image src={dora.image} />}
      ></Banner>
      <Ticket event={dora}>
        <Button size="s" before={<QR24Icon />}>
          Билет
        </Button>
      </Ticket>
    </>
  );
}
