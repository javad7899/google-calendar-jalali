import { Event } from "@/types/event";

interface EventItemProps {
  event: Event;
  onEdit?: () => void;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  return (
    <div className="p-1 mb-1 bg-green-500 text-white text-xs font-medium rounded-md flex justify-between items-center">
      <p>{event.title}</p>
      <p>ساعت {event.time}</p>
    </div>
  );
};

export default EventItem;
