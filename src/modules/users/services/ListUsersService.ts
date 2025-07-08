import { usersRepository } from '../database/repositories/users.Repositories';
import { User } from '../database/entities/User';

export default class ListUsersService {
  async execute(): Promise<User[]> {
    const users = await usersRepository.find();
    return users;
  }
}
