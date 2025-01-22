import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
} from "../controllers";

const router = express.Router();

router.route("/").post(createEvent).get(getAllEvents);
router.route("/:date").get(getSingleEvent);
router.route("/:date/:id").delete(deleteEvent).put(updateEvent);
export default router;
