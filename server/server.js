require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const candidateRoutes = require("./routes/candidateRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - update the origin to match your frontend URL
app.use(cors({
  origin: "http://localhost:5173", // Update this to match your frontend URL (e.g., Vite uses 5173 by default)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(express.json());

// Test route to verify API is working
app.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/candidates", candidateRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/candidates`);
});