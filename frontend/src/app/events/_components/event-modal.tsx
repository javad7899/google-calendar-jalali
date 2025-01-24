import { toast } from "react-toastify";
import { Button } from "@/components/button";
import { TextField } from "@/components/text-field";
import { BsSave, BsExclamationDiamond } from "react-icons/bs";
import { SelectField } from "@/components/select-field";
import { useEventsStore } from "@/stores/eventStore";

interface EventModalProps {
  isSingleDay: boolean;
}

const EventModal: React.FC<EventModalProps> = ({ isSingleDay }) => {
  const {
    eventForm,
    setEventForm,
    closeModal,
    saveEvent,
    updateEvent,
    setIsSingleDayView,
  } = useEventsStore();

  const isEditing = Boolean(eventForm._id);

  const handleTimeChange = (value: string) => {
    const sanitizedValue = value.replace(/\D/g, "");
    if (sanitizedValue.length <= 4) {
      const formattedValue =
        sanitizedValue.length > 2
          ? `${sanitizedValue.slice(0, 2)}:${sanitizedValue.slice(2)}`
          : sanitizedValue;
      setEventForm({ ...eventForm, time: formattedValue });
    }
  };

  const handleTimeBlur = () => {
    const timeRegex = /^([01]?\d|2[0-3]):([0-5]?\d)$/;
    if (!timeRegex.test(eventForm.time)) {
      toast.error(
        "زمان وارد شده نامعتبر است. لطفاً از فرمت HH:MM استفاده کنید."
      );
      setEventForm({ ...eventForm, time: "" });
    }
  };

  const handleSaveOrUpdate = async () => {
    if (!eventForm.title || !eventForm.time) {
      toast.error("عنوان و زمان رویداد الزامی هستند.");
      return;
    }

    try {
      if (isEditing) {
        setIsSingleDayView(true);
        await updateEvent(eventForm.startDate, eventForm);
        toast.success("رویداد با موفقیت ویرایش شد.");
      } else {
        setIsSingleDayView(isSingleDay);
        await saveEvent();
      }
      closeModal();
    } catch (error) {
      console.error("Error saving or updating event:", error);
      toast.error("خطایی در ذخیره یا ویرایش رویداد رخ داد.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">
          {isEditing ? "ویرایش رویداد" : "افزودن رویداد"}
        </h3>

        <TextField
          type="text-input"
          label="تاریخ"
          value={eventForm.startDate}
          disabled
        />

        <TextField
          type="text-input"
          label="عنوان"
          value={eventForm.title}
          onChange={(e) =>
            setEventForm({ ...eventForm, title: e.target.value })
          }
        />

        <TextField
          type="textarea"
          label="توضیحات"
          value={eventForm.description || ""}
          onChange={(e) =>
            setEventForm({ ...eventForm, description: e.target.value })
          }
        />

        <TextField
          type="text-input"
          label="ساعت"
          value={eventForm.time}
          onChange={(e) => handleTimeChange(e.target.value)}
          onBlur={handleTimeBlur}
          placeholder="HH:MM"
          maxLength={5}
        />

        {!isEditing && (
          <>
            <SelectField
              label="تکرار"
              options={[
                { value: "none", label: "بدون تکرار" },
                { value: "daily", label: "روزانه" },
                { value: "weekly", label: "هفتگی" },
                { value: "monthly", label: "ماهانه" },
              ]}
              value={eventForm.recurrencePattern}
              onChange={(value) =>
                setEventForm({
                  ...eventForm,
                  recurrencePattern: value,
                  isRecurring: value !== "none",
                })
              }
            />

            {eventForm.recurrencePattern !== "none" && (
              <TextField
                type="number-input"
                label="تعداد دفعات تکرار"
                min={1}
                value={eventForm.occurrences || 1}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    occurrences: parseInt(e.target.value, 10) || 1,
                  })
                }
              />
            )}
          </>
        )}

        <div className="flex gap-2 mt-6">
          <Button
            label="لغو"
            onClick={closeModal}
            bgColor="bg-red-400"
            customClasses="w-full"
            icon={<BsExclamationDiamond size={20} />}
          />
          <Button
            label="ذخیره"
            onClick={handleSaveOrUpdate}
            customClasses="w-full hover:bg-blue-600 text-white transition"
            icon={<BsSave size={20} />}
          />
        </div>
      </div>
    </div>
  );
};

export default EventModal;
