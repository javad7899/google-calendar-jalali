import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(
  cors({
    // origin: ["https://google-calendar-fe.chbk.app"],
    origin: ["http://192.168.195.80:3000"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1", router);
export default app;
