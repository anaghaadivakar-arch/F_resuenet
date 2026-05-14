
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    let reply = "";

    if (
      prompt.toLowerCase().includes("safest")
    ) {
      reply =
        "Route Alpha is currently the safest path with a safety score of 94 and minimal hazards detected.";
    } else if (
      prompt.toLowerCase().includes("battery")
    ) {
      reply =
        "Echo Team has the lowest battery level. Recommend recharge or replacement support.";
    } else if (
      prompt.toLowerCase().includes("hazard")
    ) {
      reply =
        "Critical hazards include gas leak zones and structural collapse risks near Route Delta.";
    } else if (
      prompt.toLowerCase().includes("evacuation")
    ) {
      reply =
        "Recommended evacuation strategy: prioritize Route Alpha and avoid flood-prone corridors.";
    } else {
      reply =
        "AI analysis complete. Route Alpha remains optimal for rescue deployment.";
    }

    res.json({ reply });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "AI request failed",
    });
  }
});

 

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Rescue API Running");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("Mongo Error:", err);
  });

// Server Start
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});