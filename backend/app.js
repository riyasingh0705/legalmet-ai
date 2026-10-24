const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const inspectionRoutes = require("./routes/inspection.routes");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.use(express.json({ limit: "100kb" }));

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "COMPLIMET API",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/inspections", inspectionRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  console.error(err.message);

  res.status(err.status || 500).json({
    success: false,
    message:
      err.status && err.status < 500
        ? err.message
        : "Internal server error",
  });
});

module.exports = app;