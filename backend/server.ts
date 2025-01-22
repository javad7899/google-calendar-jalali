import app from "./src/app";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/configs/db.config";

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log("There is a problem", error);
  }
};

start();
