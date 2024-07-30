import { Event } from "@/types";
import { Cell, CellProps, Image, Text } from "@telegram-apps/telegram-ui";
import Chevron16Icon from "./ui/icons/chevron16";

interface EventCellProps
  extends Event,
    Omit<CellProps, "id" | "title" | "description"> {}

export default function EventCell({
  title,
  date,
  image,
  ...restProps
}: EventCellProps) {
  return (
    <Cell
      before={<Image src={image} />}
      after={<Chevron16Icon />}
      {...restProps}
      description={date}
    >
      <Text Component="h2">{title}</Text>
    </Cell>
  );
}
