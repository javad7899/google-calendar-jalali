import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error(
      "Error: MONGODB_URI is not defined in environment variables."
    );
    process.exit(1); // Exit with failure
  }

  try {
    await mongoose.connect(uri);
    console.log("Database connected");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
