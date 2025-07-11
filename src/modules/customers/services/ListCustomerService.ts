import { customerRepositories } from "../database/repositories/CustomerRepositories";
import { Customers } from "../database/entities/Customers";



export default class ListCustomerService {
  async execute(): Promise<Customers[]> {
    const customers = await customerRepositories.find();

    return customers;
  }
}
