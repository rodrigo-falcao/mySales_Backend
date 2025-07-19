import { Order } from '../database/entities/Order';
import { Product } from '@modules/products/database/entities/Product';
import { customerRepositories } from '@modules/customers/database/repositories/CustomerRepositories';
import { ProductsRepositories } from '@modules/products/database/repositories/ProductsRepositories';
import AppError from '@shared/errors/AppError';
import { orderRepository } from '../database/repositories/OrderRepositories';

interface ICreateOrder {
  customer_id: string;
  products: Product[];
}

export default class CreateOrderService {
  async execute({customer_id, products}: ICreateOrder): Promise<Order> {
    const customerExists = await customerRepositories.findById(Number(customer_id),);
    if (!customerExists) {
      throw new AppError('Customer not found');
    }

    const existsProducts = await ProductsRepositories.findAllByIds(products);
    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const productsIds = existsProducts.map(product => String(product.id));
    const checkInexistentProducts = products.filter(
      product => !productsIds.includes(String(product.id)),
    );
    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentProducts[0].id}.`, 404);
    }

    const quantityAvailable = products.filter((product) => {
      const foundProduct = existsProducts.find(productExists => String(productExists.id) === String(product.id));
      return !foundProduct || foundProduct.quantity < product.quantity;
    });
    if (quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`, 400);
    }

    const serializedProducts = products.map(product => {
      const foundProduct = existsProducts.find(p => String(p.id) === String(product.id));
      if (!foundProduct) {
        throw new AppError(`Product ${product.id} not found when serializing.`, 404);
      }
      return {
        product_id: product.id,
        quantity: product.quantity,
        price: foundProduct.price,
      };
    });

    const order = await orderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { orders_products } = order;

    const updateProductQuantity = orders_products.map(product => {
      const foundProduct = existsProducts.find(p => String(p.id) === String(product.product_id));
      if (!foundProduct) {
        throw new AppError(`Product ${product.product_id} not found when updating quantity.`, 404);
      }
      return {
        id: product.product_id,
        quantity: foundProduct.quantity - product.quantity,
      };
    });

    await Promise.all(updateProductQuantity.map(async (product) => {
      await ProductsRepositories.update(product.id, { quantity: product.quantity });
    }));
    return order;
  }


}
