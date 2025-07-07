import AppError from "@shared/errors/AppError";
import { User } from "../database/entities/User";
import { usersRepository } from "../database/repositories/users.Repositories";
import { hash } from "bcrypt";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  async execute({name, email, password}: ICreateUser): Promise<User> {
    const emailExists = await usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError("Email address already in use.", 409);
    }
    const hashedPassword = await hash(password, 10);
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await usersRepository.save(user);

    return user;
  }
}
