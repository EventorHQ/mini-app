import { useState } from "react";
import { Cell, CellProps, Chip } from "@telegram-apps/telegram-ui";

import { Collapsible, CollapsibleContent } from "./collapsible";
import { Calendar } from "./ui/calendar";
import { useInitData } from "@telegram-apps/sdk-react";
import { Picker, PickerHighlight } from "./ui/picker";

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
  const [type, setType] = useState<"date" | "time">("date");
  const initData = useInitData();

  const handleChipClick = (t: "date" | "time") => () => {
    if (t === type || !open) setOpen((open) => !open);
    setType(t);
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Cell
        after={
          date ? (
            <div className="flex gap-2 items-center">
              <Chip onClick={handleChipClick("date")} mode="mono">
                {date.toLocaleDateString(initData?.user?.languageCode, {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Chip>
              <Chip onClick={handleChipClick("time")} mode="mono">
                {date.toLocaleTimeString(initData?.user?.languageCode, {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </Chip>
            </div>
          ) : (
            <Chip onClick={handleChipClick("date")} mode="mono">
              Выбрать
            </Chip>
          )
        }
        {...restProps}
      >
        {children}
      </Cell>
      <CollapsibleContent className="p-4 pt-2">
        {type === "date" ? (
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            required
            onSelect={(date) => onDateChange(date!)}
            fromDate={fromDate}
          />
        ) : (
          <div className="relative flex h-48 w-full">
            <Picker
              value={date?.getHours() || 0}
              setValue={(val) => {
                const dateCopy = date;
                if (!dateCopy) {
                  return;
                }

                dateCopy.setHours(val);
                onDateChange(dateCopy);
              }}
              type="hours"
            />
            <Picker
              value={date?.getMinutes() || 0}
              setValue={(val) => {
                const dateCopy = date;
                if (!dateCopy) {
                  return;
                }

                dateCopy.setMinutes(val);
                onDateChange(dateCopy);
              }}
              type="minutes"
            />
            <PickerHighlight />
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
