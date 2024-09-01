import type { FC } from "react";
import { useInitData } from "@telegram-apps/sdk-react";

export const DateString: FC<{
  date: Date | string;
  options?: Intl.DateTimeFormatOptions;
}> = ({ date, options }) => {
  const initData = useInitData();
  const format = new Intl.DateTimeFormat(initData?.user?.languageCode, {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    ...options,
  }).format;

  return format(typeof date === "string" ? new Date(date) : date);
};
