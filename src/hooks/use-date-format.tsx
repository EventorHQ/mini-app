export const useDateFormat = (options: Intl.DateTimeFormatOptions = {}) => {
  return new Intl.DateTimeFormat("ru-RU", { ...options, timeZone: "UTC" })
    .format;
};
