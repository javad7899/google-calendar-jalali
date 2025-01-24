import React from "react";
import { FaPen as FaPenIcon, FaTrash as FaTrashIcon } from "react-icons/fa6";
import { Event } from "@/types/event";
import { Button } from "@/components/button";

interface SinglePageEventItemProps {
  event: Event;
  openEditModal: (event: Event) => void;
  deleteEvent: (id: string) => void;
}

export const SinglePageEventItem: React.FC<SinglePageEventItemProps> = ({
  event,
  openEditModal,
  deleteEvent,
}) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-all">
      <h2 className="text-lg font-semibold text-blue-600 mb-2">
        عنوان رویداد: {event.title}
      </h2>
      {event.description && (
        <p className="text-gray-700">توضیحات: {event.description}</p>
      )}
      <p className="text-gray-700">ساعت: {event.time}</p>
      <div className="mt-4 flex justify-end gap-4">
        <Button
          label="ویرایش رویداد"
          icon={<FaPenIcon size={16} />}
          onClick={() => openEditModal(event)}
        />
        <Button
          label="حذف رویداد"
          icon={<FaTrashIcon size={16} />}
          onClick={() => deleteEvent(event._id || "")}
          bgColor="bg-red-500"
        />
      </div>
    </div>
  );
};
