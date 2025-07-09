import AppError from "@shared/errors/AppError";
import { usersRepository } from "../database/repositories/UsersRepositories";
import { compare } from "bcrypt";
import { hash } from "bcrypt";
import { User }  from "../database/entities/User";

interface IUpdateProfile {
  user_id: number;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

export default class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    oldPassword,
    password,
  }: IUpdateProfile): Promise<User> {

    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (email) {
      const userUpdateEmail = await usersRepository.findByEmail(email);
      if (userUpdateEmail) {
        throw new AppError('There is already one user with this email', 409);
      }
      user.email = email;
    }

    if (password && !oldPassword) {
      throw new AppError('You need to inform the old password to set a new one');
    }
    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);
      if (!checkOldPassword) {
        throw new AppError('Old password does not match', 401);
      }
      user.password = await hash(password, 10);
    }
    if (name) {
      user.name = name;
    }

    await usersRepository.save(user);
    return user;
  }
}
