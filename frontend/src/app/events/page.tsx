"use client";

import React, { useEffect } from "react";
import { useEventsStore } from "@/stores/eventStore";
import CalendarHeader from "./_components/calendar-header";
import DaysHeader from "./_components/days-header";
import Days from "./_components/days";
import EventModal from "./_components/event-modal";

const Calendar: React.FC = () => {
  const { fetchAllEvents, isModal } = useEventsStore();

  useEffect(() => {
    fetchAllEvents();
  }, [fetchAllEvents]);

  return (
    <div className="max-w-full mx-auto p-4 bg-gray-100 rounded-lg h-screen flex flex-col">
      <CalendarHeader />
      <DaysHeader />
      <Days />
      {isModal && <EventModal isSingleDay={false} />}
    </div>
  );
};

export default Calendar;
