import React from "react";
import BlankDay from "./blank-day";
import Day from "./day";
import { useEventsStore } from "@/stores/eventStore";
import { Event } from "@/types/event";
import dayjs from "@/utils/jalali-date";

const Days: React.FC = () => {
  const { currentDate, events } = useEventsStore();

  // Extract Jalali year and month
  const jalaliYear = currentDate.year();
  const jalaliMonthIndex = currentDate.month();
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf("month").day() + 1;

  const blankDays = Array.from({ length: firstDayOfMonth % 7 }, () => null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getEventsOnDay = (day: number): Event[] => {
    const targetDate = currentDate.date(day).format("YYYY-MM-DD");
    return events.filter((event: Event) => {
      const eventDate = dayjs(event.startDate).format("YYYY-MM-DD");
      return eventDate === targetDate;
    });
  };

  return (
    <div className="grid grid-cols-7 grid-rows-5 min-h-[80px] gap-2">
      {blankDays.map((_, index) => (
        <BlankDay key={`blank-${index}`} />
      ))}

      {days.map((day) => {
        const isToday =
          currentDate.year() === jalaliYear &&
          currentDate.month() === jalaliMonthIndex &&
          currentDate.date() === day;

        const isPastDay = currentDate.date(day).isBefore(dayjs(), "day");
        const fullDate = currentDate.date(day).format("YYYY-MM-DD");
        const eventsForDay = getEventsOnDay(day);

        return (
          <Day
            key={fullDate}
            day={day}
            date={fullDate}
            isToday={isToday}
            isPastDay={isPastDay}
            events={eventsForDay}
          />
        );
      })}
    </div>
  );
};

export default Days;
