import { usersRepository } from '../database/repositories/UsersRepositories';
import { User } from '../database/entities/User';

export default class ListUsersService {
  async execute(): Promise<User[]> {
    const users = await usersRepository.find();
    return users;
  }
}
