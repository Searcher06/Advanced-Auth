import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../lib/token";
import { User } from "../models/user.model";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ messaage: "You are not auth user you can't enter" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);

    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ messaage: "User not found!" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.status(400).json({ messaage: "Token invalidated!" });
    }

    const authReq = req as any;

    authReq.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ messaage: "Invalidated token!" });
  }
};
