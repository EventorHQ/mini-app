import { FC } from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import Chevron24LeftIcon from "./icons/chevron24left";
import Chevron24RightIcon from "./icons/chevron24right";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export const Calendar: FC<CalendarProps> = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-0", className)}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4",
        caption: "flex justify-between pt-1 relative items-center",
        caption_label: "tg-headline font-medium",
        nav: "flex items-center",
        nav_button: "size-8 text-tg-button",
        nav_button_previous: "absolute right-8",
        nav_button_next: "absolute right-0",
        table: "w-full",
        head_row: "grid grid-cols-7 gap-1",
        head_cell:
          "size-9 flex items-center justify-center text-tg-hint font-medium tg-caption2 uppercase",
        row: "grid grid-cols-7 gap-1 py-1",
        cell: "size-9 flex items-center justify-center tg-body [&:has([aria-selected])]:bg-tg-button-tinted [&:has([aria-selected])]:rounded-full",
        day: "h-8 w-8",
        day_selected: "text-tg-text-accent font-semibold",
        day_today: "text-tg-text-accent",
        day_hidden: "invisible",
        day_outside: "opacity-5",
        ...classNames,
      }}
      components={{
        IconLeft: () => <Chevron24LeftIcon className="text-tg-text" />,
        IconRight: () => <Chevron24RightIcon className="text-tg-text" />,
      }}
      ISOWeek
      {...props}
    />
  );
};
