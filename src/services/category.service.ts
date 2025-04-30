import Category from "../models/category.model";
import { ErrorHandler } from "../utils/errorHandler";

class CategoryService {
  async createCategory(name: string) {
    const category = await Category.create({ name });
    return category;
  }

  async getAllCategories() {
    const categories = await Category.findAll();
    return categories;
  }

  async getCategoryById(categoryId: number) {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new ErrorHandler("Category not found", 404);
    }
    return category;
  }

  async updateCategory(categoryId: number, name: string) {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new ErrorHandler("Category not found", 404);
    }

    category.name = name;
    await category.save();

    return category;
  }

  async deleteCategory(categoryId: number) {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new ErrorHandler("Category not found", 404);
    }

    await category.destroy();
    return { message: "Category deleted successfully" };
  }
}

export default CategoryService;
