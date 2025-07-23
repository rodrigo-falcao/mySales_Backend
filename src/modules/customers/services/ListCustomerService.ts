import { Customers } from "../infra/database/entities/Customers";
import { customerRepositories } from "../infra/database/repositories/CustomerRepositories";
import { IPagination } from "@shared/interfaces/pagination.interface";


export default class ListCustomerService {
  async execute(page: number = 1, limit: number = 10): Promise<IPagination<Customers>> {
    const [data, total] = await customerRepositories.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      per_page: limit,
      current_page: page,
      total_pages: totalPages,
      next_page: page < totalPages ? page + 1 : null,
      previous_page: page > 1 ? page - 1 : null,
    } as IPagination<Customers>;
  }
}
