import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcrypt';
import { usersRepository } from '../infra/database/repositories/UsersRepositories';
import {usersTokensRepositories} from '../infra/database/repositories/UsersTokensRepositories';
import AppError from '@shared/errors/AppError';
import { IResetPassword } from '../domain/models/IResetPassword';

export default class ResetPasswordService {
  async execute({token, password}: IResetPassword): Promise<void> {
    const userToken = await usersTokensRepositories.findByToken(token);
    if (!userToken) {
      throw new AppError('User token does not exist.', 404);
    }
    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist.', 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.', 401);
    }
    user.password = await hash(password,10);

    await usersRepository.save(user);
  }
}
