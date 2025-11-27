// backend/server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import apiRoutes from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", apiRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Motivational Planner API is running ✅");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
