import AppError from '@shared/errors/AppError';
import { usersRepository } from '../infra/database/repositories/UsersRepositories';
import { usersTokensRepositories } from '../infra/database/repositories/UsersTokensRepositories';
import { IForgotPassword } from '../domain/models/IForgotPassword';

export default class ServiceForgotPasswordEmailService {
  async execute({ email }: IForgotPassword): Promise<void> {
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const token = await usersTokensRepositories.generate(user.id);
    console.log(token);
  }
}
