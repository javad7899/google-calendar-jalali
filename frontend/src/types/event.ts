import { Dayjs } from "dayjs";

export interface Event {
  _id?: string;
  title: string;
  description?: string;
  startDate: string; // Start date in "YYYY-MM-DD" format
  time: string; // Time in "HH:MM" format
  isRecurring?: boolean;
  recurrencePattern: "none" | "daily" | "weekly" | "monthly";
  occurrences?: number;
  recurrenceIndex?: number;
}

export type EventsState = {
  events: Event[];
  eventForm: Event;
  currentDate: Dayjs;
  isModal: boolean;
  fetchAllEvents: () => Promise<void>;
  fetchSingleDayEvents: (date: string) => Promise<void>;
  saveEvent: () => Promise<void>;
  closeModal: () => void;
  setCurrentDate: (date: Dayjs) => void;
  openModal: (date?: string) => void;
  setEventForm: (newForm: Partial<Event>) => void;
  deleteEvent: (date: string, eventId: string) => Promise<void>;
  updateEvent: (date: string, updatedEvent: Event) => Promise<void>;
};
