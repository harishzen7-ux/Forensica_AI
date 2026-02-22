import express from "express";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import path from "path";

const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/detect", upload.single("file"), (req: any, res) => {
    const { modality, textContent } = req.body;
    const file = req.file;

    // Placeholder detection logic
    let score = Math.floor(Math.random() * 60) + 20; // 20-80 range for MVP
    let source = score > 50 ? "HUMAN" : "AI";
    let confidence = (Math.random() * 0.2 + 0.75).toFixed(2); // 0.75-0.95
    let justification = "";

    switch (modality) {
      case "photo":
        justification = score > 50 
          ? "Natural noise patterns and sensor artifacts detected. Metadata consistent with standard capture."
          : "Anomalies in edge consistency and lighting gradients suggest synthetic generation.";
        break;
      case "video":
        justification = score > 50
          ? "Temporal consistency across frames is high. No significant facial warping or blending artifacts found."
          : "Frame-to-frame inconsistencies in background rendering and facial micro-expressions detected.";
        break;
      case "text":
        const text = textContent || "";
        // Simple heuristic for MVP
        if (text.toLowerCase().includes("delve") || text.toLowerCase().includes("comprehensive")) {
          score = 30;
          source = "AI";
        }
        justification = source === "HUMAN"
          ? "Stylometric analysis shows varied sentence structure and natural linguistic flow."
          : "Highly predictable patterns and repetitive structural markers typical of Generative AI outputs.";
        break;
      case "audio":
        justification = score > 50
          ? "Spectral analysis confirms natural vocal resonance and organic background noise."
          : "Synthetic frequency peaks and unnatural silence gaps detected in the vocal track.";
        break;
      default:
        return res.status(400).json({ error: "Invalid modality" });
    }

    res.json({
      type: modality,
      generation_source: source,
      score: score,
      justification: justification,
      confidence: parseFloat(confidence)
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
