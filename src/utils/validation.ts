import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().min(0).required(),
  categoryId: Joi.number().integer().required(),
  description: Joi.string().optional().allow(""),
});

export const categorySchema = Joi.object({
  name: Joi.string().min(3).required(),
});

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "user").default("user"),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
