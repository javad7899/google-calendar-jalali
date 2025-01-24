import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(
  cors({
    origin: [
      "https://google-calendar-fe.chbk.app",
      "https://google-calendar-be.chbk.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1", router);
app.use("/", (req, res) => {
  res.json({
    message: "ok",
  });
});
export default app;
