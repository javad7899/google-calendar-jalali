import { Schema, model } from "mongoose";
import moment from "moment-jalaali";

interface IEvent {
  title: string;
  description?: string;
  startDate: string;
  time: string;
  isRecurring: boolean;
  recurrencePattern: "none" | "daily" | "weekly" | "monthly";
  occurrences: number;
  recurrenceIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    startDate: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => moment(v, "jYYYY-jMM-jDD", true).isValid(),
        message: "Invalid Shamsi date format. Use 'YYYY-MM-DD'.",
      },
    },
    time: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
        message: "Invalid time format. Use HH:mm (24-hour format).",
      },
    },
    isRecurring: { type: Boolean, default: false },
    recurrencePattern: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: function (this: IEvent) {
        return this.isRecurring;
      },
    },
    occurrences: { type: Number, default: 1, min: 1 },
    recurrenceIndex: { type: Number, default: 1 },
  },
  { timestamps: true }
);

// Pre-save middleware to handle recurring events.
eventSchema.pre("save", async function (next) {
  if (this.isNew && this.isRecurring && this.recurrencePattern) {
    const start = moment(this.startDate, "jYYYY-jMM-jDD");
    const eventsToCreate = [];
    const totalOccurrences = this.occurrences;
    const initialIndex = 1;

    this.recurrenceIndex = initialIndex;

    for (let i = 1; i < (totalOccurrences || 1); i++) {
      let nextDate;

      switch (this.recurrencePattern) {
        case "daily":
          nextDate = start.clone().add(i, "days");
          break;
        case "weekly":
          nextDate = start.clone().add(i * 7, "days");
          break;
        case "monthly":
          nextDate = start
            .clone()
            .add(i, "jMonths" as moment.unitOfTime.DurationConstructor);
          break;
        default:
          throw new Error("Invalid recurrence pattern.");
      }

      if (nextDate.isValid()) {
        eventsToCreate.push({
          title: this.title,
          description: this.description,
          startDate: nextDate.format("jYYYY-jMM-jDD"),
          time: this.time,
          isRecurring: true,
          recurrencePattern: this.recurrencePattern,
          recurrenceIndex: initialIndex + i,
          occurrences: totalOccurrences,
        });
      }
    }

    next();

    if (eventsToCreate.length > 0) {
      await Event.insertMany(eventsToCreate);
    }
  } else {
    next();
  }
});

const Event = model<IEvent>("Event", eventSchema);

export default Event;
