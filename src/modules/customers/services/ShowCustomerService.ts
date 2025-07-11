import { customerRepositories } from "../database/repositories/CustomerRepositories";
import { Customers } from "../database/entities/Customers";
import AppError from "@shared/errors/AppError";


interface IShowCustomer {
  id: number;
}

export default class ShowCustomerService {
  public async execute({ id }: IShowCustomer): Promise<Customers | null> {
    const customer = await customerRepositories.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    return customer;
  }
}
