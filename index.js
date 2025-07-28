import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Fixed CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://job-portal-frontend-ivory-chi.vercel.app"
  ],
  credentials: true
};

app.use(cors(corsOptions));

// ✅ Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ✅ Health check
app.get("/health", (req, res) => {
  return res.json({ message: "Everything working fine." });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running at port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Job Portal Backend is Live ✅");
});

