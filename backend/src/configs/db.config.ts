import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("DB connection error:", err));
};

export default connectDB;
