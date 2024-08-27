import type { FC } from "react";
import { useInitData } from "@telegram-apps/sdk-react";

export const DateString: FC<{ date: Date | string }> = ({ date }) => {
  const initData = useInitData();
  const format = new Intl.DateTimeFormat(initData?.user?.languageCode).format;

  return format(typeof date === "string" ? new Date(date) : date);
};
