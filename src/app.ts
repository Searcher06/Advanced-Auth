import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "../src/routes/auth.routes";
import userRouter from "../src/routes/user.routes";
import adminRouter from "../src/routes/admin.routes";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRouter);

app.use("/user", userRouter);

app.use("/admin", adminRouter);

export default app;
