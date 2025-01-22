import { Request, Response } from "express";
import Event from "../../models/event.model";

export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events" });
  }
};
