import AppError from '@shared/errors/AppError';
import { Product } from '../infra/database/entities/Product';
import { ProductsRepositories } from '../infra/database/repositories/ProductsRepositories';

interface IUpdateProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductsService {
  async execute({
    id,
    name,
    price,
    quantity
  }: IUpdateProduct): Promise<Product> {

    const product = await ProductsRepositories.findById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const productExists = await ProductsRepositories.findByName(name);
    if (productExists) {
      throw new AppError('There is already a product with this name', 409);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await ProductsRepositories.save(product);

    return product;
  }
}
