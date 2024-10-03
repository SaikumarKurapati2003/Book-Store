import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoute from "./route/bookRoute.js";
import cors from "cors";
import userRoute from "./route/userRoute.js" 

// Load environment variables

const app = express();
app.use(cors());

app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 4000; // Use a valid port number
const ConnectURI = process.env.MongoDBURI;

if (!ConnectURI) {
  console.error("MongoDB connection string is missing. Please check your .env file.");
  process.exit(1); // Exit if URI is missing
}

// Connect to MongoDB
mongoose.connect(ConnectURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit if connection fails
  });

  //defining routes
  app.use("/book",bookRoute);
  app.use("/user",userRoute);
// Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
