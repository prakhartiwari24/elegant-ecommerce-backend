import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../../utils/errorHandler";

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new ErrorHandler("Unauthorized", 401));
  }

  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Access forbidden: Admins only", 403));
  }

  next();
};
