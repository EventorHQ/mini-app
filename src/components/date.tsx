import type { FC } from "react";
import { useDateFormat } from "@/hooks/use-date-format";

export const DateString: FC<{
  date: Date | string;
  options?: Intl.DateTimeFormatOptions;
}> = ({ date, options }) => {
  const format = useDateFormat({
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    ...options,
  });

  return format(typeof date === "string" ? new Date(date) : date);
};
