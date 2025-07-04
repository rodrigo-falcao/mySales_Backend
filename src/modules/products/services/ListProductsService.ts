import { Product } from '../database/entities/Product';
import { ProductsRepositories } from '../database/repositories/ProductsRepositories';

export default class ListProductsService {
  async execute(): Promise<Product[]> {
    const products = await ProductsRepositories.find();
    return products;
  }
}
