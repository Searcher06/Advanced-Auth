import { NextFunction, Request, Response } from "express";

function requireRole(role: "user" | "admin") {
  return (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as any;
    const authUser = authReq.user;

    if (!authUser) {
      return res
        .status(401)
        .json({ message: "You are not auth user! you can't enter the building" });
    }

    if (authUser.role !== role) {
      return res
        .status(401)
        .json({ message: "You don't have the correct role to access this route" });
    }
    next();
  };
}
export default requireRole;
