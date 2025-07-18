import { AppDataSource } from "@shared/typeorm/data-source";
import { Order } from "../entities/Order";
import { OrderProducts } from "../entities/OrderProducts";
import { Customers } from "@modules/customers/database/entities/Customers";

export const orderProductsRepository = AppDataSource.getRepository(OrderProducts);

interface ICreateOrder {
  customer: Customers;
  products: ICreateOrderProduct[];
}

interface ICreateOrderProduct {
  product_id: string;
  quantity: number;
  price: number;
}

export const orderRepository = AppDataSource.getRepository(Order).extend({
  async findById(id: number): Promise<Order | null> {
    const order = await this.findOne({
      where: { id },
      relations: ["customer", "orders_products"],
    })

    return order;
  },
  async createOrder({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.create({
      customer,
      orders_products: products,
    });

    await this.save(order);

    return order;
  }
});
