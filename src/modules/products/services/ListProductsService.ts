import { Product } from '../infra/database/entities/Product';
import { ProductsRepositories } from '../infra/database/repositories/ProductsRepositories';

export default class ListProductsService {
  async execute(): Promise<Product[]> {
    const products = await ProductsRepositories.find();
    return products;
  }
}
