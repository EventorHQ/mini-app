import { APP_URL } from "@/config/config";

import { DetailedEvent } from "@/api/events";
import { InlineButtons } from "@telegram-apps/telegram-ui";
import { AddCircle28Icon } from "./ui/icons/addcircle28";
import { Channel24Icon } from "./ui/icons/channel24";
import { useUtils } from "@telegram-apps/sdk-react";
import { FC } from "react";
import { useNavigate } from "@/hooks/use-navigate";
import { Edit28Icon } from "./ui/icons/edit28";
import QR24Icon from "./ui/icons/qr24";

export interface EventButtonsProps {
  event: DetailedEvent;
}

const ActionButton: FC<EventButtonsProps> = ({ event }) => {
  const navigate = useNavigate();

  if (event.role === "visitor") {
    const handleClick = () => {
      alert("Showing ticket");
    };

    return (
      <InlineButtons.Item text="Билет" mode="gray" onClick={handleClick}>
        <QR24Icon />
      </InlineButtons.Item>
    );
  }
  const handleClick = () => {
    navigate(
      `/events/${event.id}/${event.role === "seeker" ? "register" : "details"}`,
      { state: { event: event } },
    );
  };

  return (
    <InlineButtons.Item
      text={event.role === "seeker" ? "Регистрация" : "Управление"}
      mode={event.role === "seeker" ? "bezeled" : "gray"}
      onClick={handleClick}
    >
      {event.role === "seeker" ? <AddCircle28Icon /> : <Edit28Icon />}
    </InlineButtons.Item>
  );
};

export default function EventButtons({ event }: EventButtonsProps) {
  const utils = useUtils();

  const handleShareClick = () => {
    utils.shareURL(`${APP_URL}?startapp=${event?.id}`, event?.title);
  };

  return (
    <InlineButtons>
      <ActionButton event={event} />
      <InlineButtons.Item
        text="Поделиться"
        mode="gray"
        onClick={handleShareClick}
      >
        <Channel24Icon />
      </InlineButtons.Item>
    </InlineButtons>
  );
}
