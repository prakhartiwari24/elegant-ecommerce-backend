import Category from "../models/category.model";
import Product from "../models/product.model";
import { ErrorHandler } from "../utils/errorHandler";

class ProductService {
  async createProduct(
    name: string,
    price: number,
    categoryId: number,
    description?: string
  ) {
    const product = await Product.create({
      name,
      price,
      description,
      categoryId,
    });

    return product;
  }

  async getAllProducts(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
      include: [{ association: "category", attributes: ["name"] }],
      offset,
      limit,
    });

    return {
      products: rows,
      total: count,
      page,
      limit,
    };
  }

  async getProductById(productId: number) {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }
    return product;
  }

  async updateProduct(
    productId: number,
    name: string,
    price: number,
    categoryId: number,
    description?: string
  ) {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    product.name = name;
    product.price = price;
    product.categoryId = categoryId;
    product.description = description;
    await product.save();

    return product;
  }

  async deleteProduct(productId: number) {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    await product.destroy();
    return { message: "Product deleted successfully" };
  }
}

export default ProductService;
