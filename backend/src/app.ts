import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://google-calendar-fe.chbk.app"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1", router);
export default app;
