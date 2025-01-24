"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dayjs from "@/utils/jalali-date";
import { useEventsStore } from "@/stores/eventStore";
import { Button } from "@/components/button";
import { SinglePageEventItem } from "./_components/single-page-event-item";
import EventModal from "../_components/event-modal";
import { toast } from "react-toastify";
import { FaAngleLeft as FaAngleLeftIcon } from "react-icons/fa6";
import { Event } from "@/types/event";

const DayView: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const {
    events,
    fetchSingleDayEvents,
    deleteEvent,
    setEventForm,
    openModal,
    isModal,
  } = useEventsStore();

  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const date = params?.date as string | undefined;
    if (!date) {
      const today = dayjs().calendar("jalali").format("YYYY-MM-DD");
      router.replace(`/events/${today}`);
      setCurrentDate(today);
    } else {
      setCurrentDate(date);
    }
  }, [params, router]);

  useEffect(() => {
    if (currentDate) {
      fetchSingleDayEvents(currentDate).catch(() =>
        toast.error("خطا در واکشی رویدادها")
      );
    }
  }, [currentDate, fetchSingleDayEvents]);

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(currentDate, eventId);
      toast.success("رویداد با موفقیت حذف شد.");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("خطایی در حذف رویداد رخ داد.");
    }
  };

  const handleOpenEditModal = (event: Event) => {
    setEventForm(event);
    openModal();
  };

  const handleOpenAddModal = () => {
    setEventForm({
      _id: undefined,
      title: "",
      description: "",
      startDate: currentDate,
      time: "",
      recurrencePattern: "none",
      occurrences: 1,
    });
    openModal();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6 flex justify-center gap-2">
          <span>رویدادهای</span>
          <span>{currentDate}</span>
        </h1>
        {events.length ? (
          <div className="space-y-4">
            {events.map((event, index) => (
              <SinglePageEventItem
                key={event._id || index}
                event={event}
                deleteEvent={handleDeleteEvent}
                openEditModal={handleOpenEditModal}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            رویدادی برای این روز وجود ندارد.
          </p>
        )}

        <div className="mt-8 flex justify-between">
          <Button
            href="/events"
            label="برگشت به صفحه تقویم"
            iconPosition="left"
            icon={<FaAngleLeftIcon size={20} />}
          />
          <Button
            label="افزودن رویداد جدید"
            onClick={handleOpenAddModal}
            customClasses="bg-green-500 text-white hover:bg-green-600"
          />
        </div>
      </div>

      {isModal && <EventModal />}
    </div>
  );
};

export default DayView;
