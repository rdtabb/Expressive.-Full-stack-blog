export const getDisplayDate = (): string => {
  const date = new Date();
  const display_time = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);

  return display_time
};
