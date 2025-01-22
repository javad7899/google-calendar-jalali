import express from "express";

const router = express.Router();
import eventRouter from "./event.routes";

router.use("/events", eventRouter);

export default router;
