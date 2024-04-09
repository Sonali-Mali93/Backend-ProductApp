const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./route/route");
const cors = require('cors');

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Define routes
app.use("/", router);

// Connect to MongoDB using Mongoose
try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB!");
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
}

// Start the server
app.listen(process.env.PORT || 3001, (err) => {
  if (err) throw err;
  console.log("Server running on port", process.env.PORT);
});
