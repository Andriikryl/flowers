const currentDay = new Date().getUTCDay() - 1;
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const curentDayName = days[currentDay];