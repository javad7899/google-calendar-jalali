import { Request, Response } from "express";
import Event from "../../models/event.model";
import moment from "moment-jalaali";

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { date, id } = req.params;

    if (!date || !id) {
      res
        .status(400)
        .json({ error: "Both date and id parameters are required" });
      return;
    }

    const targetDate = moment(date, "jYYYY-jMM-jDD");
    if (!targetDate.isValid()) {
      res.status(400).json({ error: "Invalid date format" });
      return;
    }

    const deletedEvent = await Event.findOneAndDelete({
      startDate: date,
      _id: id,
    });

    if (!deletedEvent) {
      res
        .status(404)
        .json({ error: "No event found with the given date and id" });
      return;
    }

    res
      .status(200)
      .json({ message: "Event deleted successfully", event: deletedEvent });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Error deleting event" });
  }
};
