import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../../utils/errorHandler";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const authenticateJWT = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next(new ErrorHandler("Authorization token required", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
};
