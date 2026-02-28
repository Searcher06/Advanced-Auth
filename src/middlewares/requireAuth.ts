import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../lib/token";
import { User } from "../models/user.model";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ messaage: "Unauthorized" });
  }

  const token = authHeader.split("")[1];

  try {
    const payload = verifyAccessToken(token);

    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ messaage: "User not found!" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.status(400).json({ messaage: "Token invalidated!" });
    }
  } catch (error) {}
};
