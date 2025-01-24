import { create } from "zustand";
import dayjs, { Dayjs } from "dayjs";
import jalaliday from "jalaliday";
import customAxios from "@/utils/custom-axios";
import { EventsState, Event } from "@/types/event";
import { toast } from "react-toastify";

dayjs.extend(jalaliday);
dayjs.locale("fa");

export const useEventsStore = create<EventsState>((set, get) => ({
  events: [],
  currentDate: dayjs().locale("fa").calendar("jalali"),
  setCurrentDate: (date: Dayjs) => set({ currentDate: date }),
  isModal: false,
  isSingleDayView: false,
  setIsSingleDayView: (isSingleDay: boolean) =>
    set({ isSingleDayView: isSingleDay }),
  eventForm: {
    startDate: dayjs().locale("fa").calendar("jalali").format("YYYY-MM-DD"),
    title: "",
    description: "",
    time: "",
    recurrencePattern: "none",
    occurrences: 1,
  },
  setEventForm: (newForm: Partial<EventsState["eventForm"]>) =>
    set((state) => {
      const updatedForm = { ...state.eventForm, ...newForm };

      // Automatically update isRecurring based on recurrencePattern
      if (
        updatedForm.recurrencePattern &&
        updatedForm.recurrencePattern !== "none"
      ) {
        updatedForm.isRecurring = true; // Recurring event
      } else {
        updatedForm.isRecurring = false; // Single event
      }

      return { eventForm: updatedForm };
    }),

  fetchAllEvents: async () => {
    try {
      const response = await customAxios.get(`/events`);
      set({ events: Array.isArray(response.data) ? response.data : [] });
    } catch (error) {
      console.error("Error fetching all events:", error);
      set({ events: [] }); // Ensure fallback to an empty array
    }
  },

  fetchSingleDayEvents: async (date: string) => {
    try {
      const response = await customAxios.get(`/events/${date}`);
      set({ events: Array.isArray(response.data) ? response.data : [] });
    } catch (error) {
      console.error("Error fetching single day events:", error);
      set({ events: [] }); // Ensure fallback to an empty array
    }
  },

  openModal: (date?: string) => {
    set((state) => ({
      eventForm: {
        ...state.eventForm,
        startDate: date || state.eventForm.startDate,
      },
      isModal: true,
    }));
  },
  closeModal: () => set({ isModal: false }),
  saveEvent: async () => {
    try {
      const {
        eventForm,
        fetchAllEvents,
        fetchSingleDayEvents,
        isSingleDayView,
      } = get();

      const { title, startDate, time, recurrencePattern, occurrences } =
        eventForm;

      if (!title || !startDate || !time) {
        toast.error("عنوان، تاریخ و زمان رویداد الزامی است.");
        return;
      }

      if (recurrencePattern !== "none" && (!occurrences || occurrences < 1)) {
        toast.error("تعداد دفعات تکرار باید حداقل 1 باشد.");
        return;
      }

      const isRecurring = recurrencePattern !== "none";

      const requestData = {
        ...eventForm,
        isRecurring,
      };

      const response = await customAxios.post(`/events`, requestData);

      if (response.status === 201) {
        // بررسی حالت صفحه
        if (isSingleDayView) {
          await fetchSingleDayEvents(startDate);
        } else {
          await fetchAllEvents();
        }

        set({
          isModal: false,
          eventForm: {
            title: "",
            description: "",
            startDate: dayjs().format("YYYY-MM-DD"),
            time: "",
            recurrencePattern: "none",
            occurrences: 1,
            isRecurring: false,
          },
        });

        toast.success("رویداد با موفقیت ذخیره شد.");
      } else {
        toast.error("پاسخ غیرمنتظره از سرور.");
      }
    } catch (error: any) {
      console.error(
        "خطا در ذخیره رویداد:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.error || "خطایی رخ داد. لطفاً دوباره تلاش کنید."
      );
    }
  },

  deleteEvent: async (date: string, eventId: string) => {
    try {
      await customAxios.delete(`/events/${date}/${eventId}`);
      set((state) => ({
        events: state.events.filter((event) => event._id !== eventId),
      }));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  },
  updateEvent: async (date: string, updatedEvent: Event) => {
    try {
      await customAxios.put(
        `/events/${date}/${updatedEvent._id}`,
        updatedEvent
      );
      set((state) => ({
        events: state.events.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        ),
      }));
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  },
}));
