import ProductService from "../services/product.service";
import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";
import { productSchema } from "../utils/validation";
import { sendSuccessResponse } from "../utils/responseHandler";
import logger from "../utils/logger";
import { PaginatedProductsDto, ProductResponseDto } from "../dto";

class ProductController {
  private readonly productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    logger.info("🚀 ~ ProductController ~ getAllProducts called");
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await this.productService.getAllProducts(page, limit);
      const products: ProductResponseDto[] = (result.products as any[]).map(
        (instance) => {
          const obj = instance.toJSON();
          return {
            id: obj.id,
            name: obj.name,
            price: obj.price,
            description: obj.description,
            categoryId: obj.categoryId,
            createdAt: obj.createdAt,
            updatedAt: obj.updatedAt,
            category: {
              id: obj.category.id,
              name: obj.category.name,
            },
          };
        }
      );

      const data: PaginatedProductsDto = {
        products,
        total: result.total,
        page: result.page,
        limit: result.limit,
      };

      res
        .status(200)
        .json(sendSuccessResponse("Products fetched successfully", data));
    } catch (err: any) {
      logger.error(`Error in getAllProducts: ${err.message}`);
      return next(new ErrorHandler(err.message, 500));
    }
  }

  async createProduct(req: Request, res: Response) {
    logger.info("🚀 ~ ProductController ~ createProduct called");

    const { error } = productSchema.validate(req.body);
    if (error) {
      throw new ErrorHandler(error.details[0].message, 400);
    }

    const { name, price, categoryId, description } = req.body;

    try {
      const product = await this.productService.createProduct(
        name,
        price,
        categoryId,
        description
      );
      res
        .status(201)
        .json(sendSuccessResponse("Product created successfully", product));
    } catch (err: any) {
      throw new ErrorHandler(err.message, 500);
    }
  }

  async getProductById(req: Request, res: Response) {
    logger.info("🚀 ~ ProductController ~ getProductById called");

    try {
      const product = await this.productService.getProductById(
        Number(req.params.id)
      );
      res
        .status(200)
        .json(
          sendSuccessResponse("Product details fetched successfully", product)
        );
    } catch (err: any) {
      throw new ErrorHandler(err.message, 500);
    }
  }

  async updateProduct(req: Request, res: Response) {
    logger.info("🚀 ~ ProductController ~ updateProduct called");

    const { error } = productSchema.validate(req.body);
    if (error) {
      throw new ErrorHandler(error.details[0].message, 400);
    }

    const { name, price, categoryId, description } = req.body;

    try {
      const product = await this.productService.updateProduct(
        Number(req.params.id),
        name,
        price,
        categoryId,
        description
      );
      res
        .status(200)
        .json(sendSuccessResponse("Product updated successfully", product));
    } catch (err: any) {
      throw new ErrorHandler(err.message, 500);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    logger.info("🚀 ~ ProductController ~ deleteProduct called");

    try {
      const resp = await this.productService.deleteProduct(
        Number(req.params.id)
      );
      res.status(200).send(resp);
    } catch (err: any) {
      throw new ErrorHandler(err.message, 500);
    }
  }
}

export default ProductController;
