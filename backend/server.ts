import app from "./src/app";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/configs/db.config";

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.log("There is a problem", error);
  }
};

start();
