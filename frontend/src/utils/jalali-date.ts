import dayjs from "dayjs";
import jalaliday from "jalaliday";

export const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export const persianDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

dayjs.extend(jalaliday);
dayjs.locale("fa");

export const jalaliCalendar = dayjs()
  .locale("fa")
  .calendar("jalali")
  .format("YYYY-MM-DD");

export default dayjs;
