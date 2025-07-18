import { orderRepository } from "../database/repositories/OrderRepositories";
import { Order } from "../database/entities/Order";
import AppError from "@shared/errors/AppError";

export default class ShowOrderService {
  public async execute(id: string): Promise<Order> {
    const order = await orderRepository.findById(Number(id));

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    return order;
  }
}
