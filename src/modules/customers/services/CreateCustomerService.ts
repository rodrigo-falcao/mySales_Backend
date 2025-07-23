import { customerRepositories } from "../infra/database/repositories/CustomerRepositories";
import { Customers } from "../infra/database/entities/Customers";
import { ICreateCustomer } from "../domain/models/ICreateUser";
import AppError from "@shared/errors/AppError";


export default class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customers> {
    const emailExist = await customerRepositories.findByEmail(email);

    if (emailExist) {
      throw new AppError('Email already exists', 409);
    }

    const customer = customerRepositories.create({ name, email });

    await customerRepositories.save(customer);

    return customer;
  }
}
