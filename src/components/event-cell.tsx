import { Cell, CellProps, Image, Text } from "@telegram-apps/telegram-ui";
import Chevron16Icon from "./ui/icons/chevron16";
import { ReadEvent } from "@/api/events";
import { DateString } from "./date";

interface EventCellProps extends CellProps {
  event: ReadEvent;
}

export default function EventCell({ event, ...restProps }: EventCellProps) {
  return (
    <Cell
      before={<Image src={event.cover_img} />}
      after={<Chevron16Icon />}
      {...restProps}
      subhead={event.role === "creator" && "Организатор"}
      description={<DateString date={event.start_date} />}
    >
      <Text Component="h2">{event.title}</Text>
    </Cell>
  );
}
