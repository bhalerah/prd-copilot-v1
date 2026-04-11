import express from "express";
import cors from "cors";
import { runPipeline } from "./runPipeline.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/prd", async (req, res) => {
  try {
    console.log("API hit: /api/prd");

    const {
      featureIdea,
      targetUser,
      businessProblem = "",
      constraints = "",
    } = req.body ?? {};

    if (!featureIdea?.trim()) {
      console.log("Validation failed: missing featureIdea");
      return res.status(400).json({
        error: "featureIdea is required",
      });
    }

    console.log("Input received:");
    console.log({
      featureIdea,
      targetUser,
      businessProblem,
      constraints,
    });

    console.log("Starting pipeline...");

    const result = await runPipeline({
      featureIdea,
      targetUser,
      businessProblem,
      constraints,
    });

    console.log("Pipeline completed successfully");
    console.log("Sending response back to UI");

    res.json(result);
  } catch (error) {
    console.error("PRD pipeline error:", error);

    res.status(500).json({
      error: "Failed to generate PRD",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`PRD API running at http://localhost:${PORT}`);
});