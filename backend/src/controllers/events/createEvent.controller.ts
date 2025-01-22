import { Request, Response } from "express";
import Event from "../../models/event.model";

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      description,
      startDate,
      time,
      isRecurring,
      recurrencePattern,
      occurrences,
    } = req.body;

    // Validate required fields
    if (!title || !startDate || !time) {
      res
        .status(400)
        .json({ error: "Title, startDate, and time are required." });
      return;
    }

    // Validate recurring fields
    if (isRecurring && (!recurrencePattern || !occurrences)) {
      res.status(400).json({
        error:
          "Recurrence pattern and occurrences are required for recurring events.",
      });
      return;
    }

    const event = new Event({
      title,
      description,
      startDate,
      time,
      isRecurring,
      recurrencePattern,
      occurrences,
    });

    await event.save();

    res.status(201).json({
      message: "Event created successfully.",
      event,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the event." });
  }
};
