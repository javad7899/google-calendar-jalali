import { Request, Response } from "express";
import Event from "../../models/event.model";
import moment from "moment-jalaali";

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { date, id } = req.params;
    const { title, description, time } = req.body;

    if (!date || !id) {
      res
        .status(400)
        .json({ error: "Both date and id parameters are required" });
      return;
    }

    if (!title && !description && !time) {
      res
        .status(400)
        .json({ error: "At least one of title or description is required" });
      return;
    }

    const targetDate = moment(date, "jYYYY-jMM-jDD");
    if (!targetDate.isValid()) {
      res.status(400).json({ error: "Invalid date format" });
      return;
    }

    const updatedEvent = await Event.findOneAndUpdate(
      { startDate: date, _id: id },
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(time && { time }),
      },
      { new: true }
    );

    if (!updatedEvent) {
      res
        .status(404)
        .json({ error: "No event found with the given date and id" });
      return;
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Error updating event" });
  }
};
