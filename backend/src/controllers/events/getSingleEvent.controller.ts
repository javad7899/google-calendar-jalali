import { Request, Response } from "express";
import Event from "../../models/event.model";
import moment from "moment-jalaali";

export const getSingleEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { date } = req.params;

    if (!date) {
      res.status(400).json({ error: "Date parameter is required" });
      return;
    }

    const targetDate = moment(date, "jYYYY-jMM-jDD");
    if (!targetDate.isValid()) {
      res.status(400).json({ error: "Invalid date format" });
      return;
    }

    const event = await Event.find({
      startDate: date,
    });

    if (!event) {
      res.status(404).json({ error: "No event found for the given date" });
      return;
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event by date:", error);
    res.status(500).json({ error: "Error fetching event by date" });
  }
};
