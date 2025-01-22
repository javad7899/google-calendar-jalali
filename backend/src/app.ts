import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/v1", router);
export default app;
