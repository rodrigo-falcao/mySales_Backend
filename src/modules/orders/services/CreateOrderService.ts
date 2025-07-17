import { Order } from '../database/entities/Order';
import { Product } from '@modules/products/database/entities/Product';
import { customerRepositories } from '@modules/customers/database/repositories/CustomerRepositories';
import { ProductsRepositories } from '@modules/products/database/repositories/ProductsRepositories';
import AppError from '@shared/errors/AppError';
import { orderRepository } from '../database/repositories/OrderRepositories';
import { OrderProducts } from '../database/entities/OrderProducts';

interface ICreateOrder {
  customer_id: string;
  products: Product[];
}

class CreateOrderService {
  async execute({customer_id, products}: ICreateOrder): Promise<Order> {
    const customerExists = await customerRepositories.findById(Number(customer_id),);
    if (!customerExists) {
      throw new AppError('Customer not found');
    }

    const existsProducts = await ProductsRepositories.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const productsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !productsIds.includes(product.id),
    );
    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentProducts[0].id}.`, 404);
    }

    const quantityAvailable = products.filter((product) => {
      existsProducts.filter((productExists) => productExists.id === product.id)[0].quantity < product.quantity;
      });
    if (quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`, 400);
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await orderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { orders_products } = order;

    const updateProductQuantity = orders_products.map(product => ({
      id: product.product_id,
      quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity,
    }));
    await ProductsRepositories.save(updateProductQuantity);

    return order;
  }


}
