import { persianDays } from "@/utils/jalali-date";
import React from "react";

const DaysHeader = () => {
  return (
    <div className="grid grid-cols-7 text-center mb-2">
      {persianDays.map((day) => (
        <span key={day} className="text-sm font-semibold">
          {day}
        </span>
      ))}
    </div>
  );
};

export default DaysHeader;
