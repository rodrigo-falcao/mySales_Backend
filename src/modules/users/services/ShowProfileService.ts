import { IShowProfile } from '../domain/models/IShowProfile';
import { User } from '../infra/database/entities/User';
import { usersRepository } from '../infra/database/repositories/UsersRepositories';
import AppError from '@shared/errors/AppError';

export default class ShowProfileService {
  async execute({ user_id }: IShowProfile): Promise<User> {
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}
