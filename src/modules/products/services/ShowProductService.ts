import AppError from "@shared/errors/AppError";
import { Product } from "../database/entities/Product";
import { ProductsRepositories } from "../database/repositories/ProductsRepositories";

interface IShowProduct {
  id: string;
}

export default class CreateProductsService {
  async execute({ id }: IShowProduct): Promise<Product> {
    const product = await ProductsRepositories.findById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }
}
