import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "../src/routes/auth.routes";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRouter);

export default app;
