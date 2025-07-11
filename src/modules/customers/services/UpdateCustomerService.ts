import { customerRepositories } from "../database/repositories/CustomerRepositories";
import { Customers } from "../database/entities/Customers";
import AppError from "@shared/errors/AppError";

interface IUpdateCustomer {
  id: number,
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  async execute({id, name, email }: IUpdateCustomer): Promise<Customers> {
    const customer = await customerRepositories.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    const emailExist = await customerRepositories.findByEmail(email);

    if (emailExist && email !== customer.email) {
      throw new AppError('There is already one customer with this email', 409);
    }

    customer.name = name;
    customer.email = email;

    await customerRepositories.save(customer);

    return customer;
  }
}
