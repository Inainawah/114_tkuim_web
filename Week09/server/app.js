import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signupRoute from "./routes/signup.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const ALLOWED = process.env.ALLOWED_ORIGIN || "*";

// CORS
app.use(cors({ origin: ALLOWED, methods: ["GET", "POST"] }));

// JSON parser
app.use(express.json());

// API route
app.use("/api/signup", signupRoute);

// 404
app.use((req, res) => {
  res.status(404).json({ ok: false, message: "找不到資源" });
});

// 500
app.use((err, req, res, next) => {
  console.error("伺服器錯誤：", err);
  res.status(500).json({ ok: false, message: "伺服器內部錯誤" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});