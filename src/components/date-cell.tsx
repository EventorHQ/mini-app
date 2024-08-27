import { useState } from "react";
import { Cell, CellProps, Chip } from "@telegram-apps/telegram-ui";

import { Collapsible, CollapsibleContent } from "./collapsible";
import { Calendar } from "./ui/calendar";
import { useInitData } from "@telegram-apps/sdk-react";

interface DateCellProps extends CellProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  fromDate?: Date;
}

export default function DateCell({
  children,
  date,
  onDateChange,
  fromDate,
  ...restProps
}: DateCellProps) {
  const [open, setOpen] = useState(false);
  const initData = useInitData();

  const handleChipClick = () => setOpen((open) => !open);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Cell
        after={
          <Chip onClick={handleChipClick} mode="mono">
            {date
              ? date.toLocaleDateString(initData?.user?.languageCode, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Выбрать"}
          </Chip>
        }
        {...restProps}
      >
        {children}
      </Cell>
      <CollapsibleContent className="p-4 pt-2">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          required
          onSelect={(date) => onDateChange(date!)}
          fromDate={fromDate}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
