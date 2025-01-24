import React from "react";
import dayjs, { persianMonths } from "@/utils/jalali-date";
import { useEventsStore } from "@/stores/eventStore";
import { Button } from "../../../components/button";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const CalendarHeader: React.FC = () => {
  const { currentDate, setCurrentDate } = useEventsStore();

  const jalaliYear = currentDate.year();
  const jalaliMonthIndex = currentDate.month();
  const jalaliMonth = persianMonths[jalaliMonthIndex];

  const goToToday = () => {
    const today = dayjs().calendar("jalali");
    if (!currentDate.isSame(today, "day")) {
      setCurrentDate(today);
    }
  };

  const handlePreviousMonth = () =>
    setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  return (
    <div className="flex justify-between items-center mb-4">
      <Button
        label="قبلی"
        onClick={handlePreviousMonth}
        icon={<FaAngleRight size={16} />}
      />
      <div className="flex gap-4 items-center">
        <Button href="/" label="صفحه خانه" bgColor="bg-green-500" />
        <h2 className="text-xl font-bold">
          {jalaliMonth} {jalaliYear}
        </h2>
        <Button label="امروز" onClick={goToToday} bgColor="bg-violet-500" />
      </div>
      <Button
        label="بعدی"
        onClick={handleNextMonth}
        icon={<FaAngleLeft size={16} />}
        iconPosition="left"
      />
    </div>
  );
};

export default CalendarHeader;
