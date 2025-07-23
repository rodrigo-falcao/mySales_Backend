import AppError from "@shared/errors/AppError";
import { Product } from "../infra/database/entities/Product";
import { ProductsRepositories } from "../infra/database/repositories/ProductsRepositories";

interface IShowProduct {
  id: string;
}

export default class ShowProductsService {
  async execute({ id }: IShowProduct): Promise<Product> {
    const product = await ProductsRepositories.findById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }
}
