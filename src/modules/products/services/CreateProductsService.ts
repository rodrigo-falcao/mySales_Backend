import AppError from "@shared/errors/AppError";
import { Product } from "../database/entities/Product";
import { ProductsRepositories } from "../database/repositories/ProductsRepositories";

interface ICreateProduct {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductsService {
  async execute({name, price, quantity}: ICreateProduct): Promise<Product> {
    const productExists = await ProductsRepositories.findByName(name);

    if (productExists) {
      throw new AppError("There is already a product with this name.", 409);
    }

    const product = ProductsRepositories.create({
      name,
      price,
      quantity
    });

    await ProductsRepositories.save(product);
    const productCreated = await ProductsRepositories.findOneBy({ id: product.id });
    return productCreated!;
  }
}
