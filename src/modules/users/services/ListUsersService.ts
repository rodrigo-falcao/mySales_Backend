import { usersRepository } from '../infra/database/repositories/UsersRepositories';
import { User } from '../infra/database/entities/User';

export default class ListUsersService {
  async execute(): Promise<User[]> {
    const users = await usersRepository.find();
    return users;
  }
}
