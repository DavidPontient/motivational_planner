// backend/server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import apiRoutes from "./routes/api.js"; // your existing API routes

const app = express();
const PORT = process.env.PORT || 10000;

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON
app.use(express.json());

// Serve static frontend files (index.html, app.js, style.css, assets)
app.use(express.static(path.join(__dirname, "../")));

// Use API routes
app.use("/api", apiRoutes);

// Default route: serve index.html for any unknown route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Test API endpoint
app.get("/api/status", (req, res) => {
  res.send("Motivational Planner API is running ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
