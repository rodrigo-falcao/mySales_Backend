import { instanceToInstance } from "class-transformer";
import CreateUserService from "../services/CreateUserService";
import ListUsersService from "../services/ListUsersService";
import { Request, Response } from "express";

export default class UsersControllers {
  async index(request: Request, response: Response): Promise<Response> {
    const listUsersService = new ListUsersService();

    const users = await listUsersService.execute();
    return response.json(instanceToInstance(users));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const users = await createUserService.execute({
      name,
      email,
      password,
    });
    return response.json(instanceToInstance(users));
  }
}
