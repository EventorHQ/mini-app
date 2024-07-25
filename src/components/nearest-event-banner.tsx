import { dora } from "@/mockContent";
import { Banner, Button, Image } from "@telegram-apps/telegram-ui";
import QR24Icon from "./ui/icons/qr24";

export default function NearestEventBanner() {
  return (
    <Banner
      type="section"
      header={dora.title}
      subheader={dora.date}
      before={<Image src={dora.image} />}
    >
      <Button size="s" before={<QR24Icon />}>
        Билет
      </Button>
    </Banner>
  );
}
