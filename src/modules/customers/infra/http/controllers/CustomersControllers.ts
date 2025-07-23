import { Request, Response } from "express";
import ListCustomerService from "../services/ListCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import CreateCustomerService from "../services/CreateCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";

export default class CustomersControllers {
  async index(request: Request, response: Response): Promise<Response> {
    const page = parseInt(request.query.page as string, 10) || 1;
    const limit = parseInt(request.query.limit as string, 10) || 10;
    const listCustomers = new ListCustomerService();
    const customers = await listCustomers.execute(page, limit);

    return response.json(customers);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);

    const showCustomers = new ShowCustomerService();
    const customer = await showCustomers.execute({ id });

    return response.json(customer);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomer = new CreateCustomerService();
    const customer = await createCustomer.execute({ name, email });

    return response.json(customer);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const { name, email } = request.body;

    const updateCustomer = new UpdateCustomerService();
    const customer = await updateCustomer.execute({ id, name, email });

    return response.json(customer);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);

    const deleteCustomer = new DeleteCustomerService();
    await deleteCustomer.execute({ id });

    return response.json();
  }

}
