import { customerRepositories } from '../database/repositories/CustomerRepositories';
import AppError from '@shared/errors/AppError';

interface IDeleteCustomer {
  id: number;
}

export default class DeleteCustomerService {
  async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await customerRepositories.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    await customerRepositories.remove(customer);
  }
}
