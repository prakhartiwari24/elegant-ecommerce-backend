import CategoryService from "../services/category.service";
import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";
import { categorySchema } from "../utils/validation";
import { sendSuccessResponse } from "../utils/responseHandler";
import logger from "../utils/logger";
import { CategoryResponseDto } from "../dto";

class CategoryController {
  private readonly categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  async getAllCategories(req: Request, res: Response) {
    logger.info("🚀 ~ CategoryController ~ getAllCategories called");

    try {
      const categories = await this.categoryService.getAllCategories();
      const data: CategoryResponseDto[] = categories.map((c) => ({
        id: c.id,
        name: c.name,
      }));
      res
        .status(200)
        .json(
          sendSuccessResponse("Categories fetched successfully", categories)
        );
    } catch (err: any) {
      throw new ErrorHandler(err.message, 500);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    logger.info("🚀 ~ CategoryController ~ createCategory called");

    const { error } = categorySchema.validate(req.body);
    if (error) {
      logger.warn(`Validation failed: ${error.details[0].message}`);
      return next(new ErrorHandler(error.details[0].message, 400));
    }

    const { name } = req.body;

    try {
      const category = await this.categoryService.createCategory(name);
      const data: CategoryResponseDto = {
        id: category.id,
        name: category.name,
      };
      res
        .status(201)
        .json(sendSuccessResponse("Category created successfully", data));
    } catch (err: any) {
      throw new ErrorHandler(err.message, 500);
    }
  }

  async getCategoryById(req: Request, res: Response) {
    logger.info("🚀 ~ CategoryController ~ getCategoryById called");

    try {
      const category = await this.categoryService.getCategoryById(
        Number(req.params.id)
      );
      const data: CategoryResponseDto = {
        id: category.id,
        name: category.name,
      };

      res
        .status(200)
        .json(
          sendSuccessResponse("Category detailed fetched successfully", data)
        );
    } catch (err: any) {
      throw new ErrorHandler(err.message, 500);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    logger.info("🚀 ~ CategoryController ~ updateCategory called");

    const { error } = categorySchema.validate(req.body);
    if (error) {
      logger.warn(`Validation failed: ${error.details[0].message}`);
      return next(new ErrorHandler(error.details[0].message, 400));
    }

    const { name } = req.body;

    try {
      const category = await this.categoryService.updateCategory(
        Number(req.params.id),
        name
      );
      const data: CategoryResponseDto = {
        id: category.id,
        name: category.name,
      };
      res
        .status(200)
        .json(sendSuccessResponse("Category updated successfully", data));
    } catch (err: any) {
      throw new ErrorHandler(err.message, 500);
    }
  }

  async deleteCategory(req: Request, res: Response) {
    logger.info("🚀 ~ CategoryController ~ deleteCategory called");

    try {
      const resp = await this.categoryService.deleteCategory(
        Number(req.params.id)
      );
      res.status(200).send(resp);
    } catch (err: any) {
      throw new ErrorHandler(err.message, 500);
    }
  }
}

export default CategoryController;
