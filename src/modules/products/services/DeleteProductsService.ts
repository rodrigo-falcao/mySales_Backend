import { ProductsRepositories } from '../database/repositories/ProductsRepositories';
import AppError from '@shared/errors/AppError';
import { Product } from '../database/entities/Product';

interface IDeleteProduct {
  id: string;
}

export default class DeleteProductsService {
  async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await ProductsRepositories.findById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    await ProductsRepositories.remove(product);
  }
}
