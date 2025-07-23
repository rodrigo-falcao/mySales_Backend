import { IDeleteProduct } from '../domain/models/IDeleteProduct';
import { ProductsRepositories } from '../infra/database/repositories/ProductsRepositories';
import AppError from '@shared/errors/AppError';

export default class DeleteProductsService {
  async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await ProductsRepositories.findById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    await ProductsRepositories.remove(product);
  }
}
