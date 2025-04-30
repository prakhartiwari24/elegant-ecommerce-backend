import AuthService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/errorHandler";
import { loginSchema, signupSchema } from "../utils/validation";
import { sendSuccessResponse } from "../utils/responseHandler";
import logger from "../utils/logger";

class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    logger.info("🚀 ~ AuthController ~ signup called");

    const { error } = signupSchema.validate(req.body);
    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }

    const { email, password, role } = req.body;

    try {
      const user = await AuthService.signup(email, password, role);
      res.status(201).json(sendSuccessResponse("Signed up successfully", user));
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    logger.info("🚀 ~ AuthController ~ login called");

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }

    const { email, password } = req.body;

    try {
      const token = await AuthService.login(email, password);
      res
        .status(200)
        .json(sendSuccessResponse("Logged in successfully", token));
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
