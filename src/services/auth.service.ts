import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { ErrorHandler } from "../utils/errorHandler";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

class AuthService {
  static async signup(email: string, password: string, role: string) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ErrorHandler("Email already registered", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword, role });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    const tokenObj = { token, expires: "1h" };
    return this.sendUserObj(user, tokenObj);
  }
  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ErrorHandler("Invalid credentials", 401);
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    const tokenObj = { token, expires: "1h" };
    return this.sendUserObj(user, tokenObj);
  }

  static sendUserObj(
    user: any,
    tokenObject: { token: string; expires: string }
  ) {
    const respObj = {
      success: true,
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
      email: user.email,
      id: user.id,
    };
    return respObj;
  }
}

export default AuthService;
