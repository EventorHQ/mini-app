import { Event } from "@/types";
import { Cell, Image, Text } from "@telegram-apps/telegram-ui";
import Chevron16Icon from "./ui/icons/chevron16";

interface EventCellProps extends Event {}

export default function EventCell({ title, date, image }: EventCellProps) {
  return (
    <Cell
      description={date}
      before={<Image src={image} />}
      after={<Chevron16Icon />}
    >
      <Text Component="h2">{title}</Text>
    </Cell>
  );
}
