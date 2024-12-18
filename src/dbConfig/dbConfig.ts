import mongoose from "mongoose";

export async function connect() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      console.error("❌ MONGO_URL environment variable is not defined.");
      throw new Error("MONGO_URL environment variable is not defined.");
    }

    const connectionOptions = {};

    await mongoose.connect(mongoUrl, connectionOptions);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("✅ Connected to database MongoDB");
    });

    connection.on("disconnected", () => {
      console.log("❌ Disconnected from MongoDB");
    });

    connection.on("error", (error) => {
      console.error("❌ Error connecting to database", error);
      process.exit(1);
    });

    return connection;
  } catch (error) {
    console.error("❌ Error establishing database connection", error);
    process.exit(1);
  }
}
