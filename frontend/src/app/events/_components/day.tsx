"use client";

import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import EventItem from "./event-item";
import { Event } from "@/types/event";
import { useEventsStore } from "@/stores/eventStore";

interface DayProps {
  day: number;
  isToday: boolean;
  isPastDay: boolean;
  events: Event[];
  date: string;
}

const Day: React.FC<DayProps> = ({ day, isToday, isPastDay, events, date }) => {
  const { openModal } = useEventsStore();
  const router = useRouter();

  const handleAddEvent = () => {
    openModal(date);
  };

  const handleGoToDayView = () => {
    router.push(`/events/${date}`);
  };

  return (
    <div
      className={`relative p-2 flex flex-col items-center justify-start rounded-md min-h-[120px] overflow-hidden ${
        isToday ? "border-blue-500 bg-blue-100 border-2" : ""
      } ${
        isPastDay
          ? "bg-gray-300 cursor-not-allowed"
          : events.length > 0
          ? "bg-green-50 hover:bg-green-100 min-h-fit"
          : "bg-white hover:bg-blue-50"
      }`}
    >
      {!isPastDay && (
        <button
          onClick={handleAddEvent}
          className="absolute top-2 right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600"
        >
          <FaPlus size={12} />
        </button>
      )}
      <div className="flex items-center gap-2">
        <p className="font-bold text-xl">{day}</p>
        {isToday && <p className="text-blue-700 text-sm font-bold">امروز</p>}
      </div>

      {events.length > 0 && (
        <div className="mt-2 w-full relative">
          {events.slice(0, 2).map((event) => (
            <EventItem key={event._id} event={event} />
          ))}

          <button
            onClick={handleGoToDayView}
            className="my-1 p-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 w-full flex justify-center gap-2"
          >
            <span>صفحه روز</span>
            {events.length > 2 && <span>{events.length - 2} رویداد دیگر</span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default Day;
