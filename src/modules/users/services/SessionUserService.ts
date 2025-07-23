import "dotenv/config";
import { compare } from "bcrypt";
import { Secret, sign } from "jsonwebtoken";
import { usersRepository } from "../infra/database/repositories/UsersRepositories";
import AppError from "@shared/errors/AppError";
import { ISessionUser } from "../domain/models/ISessionUser";
import { ISessionResponse } from "../domain/models/ISessionResponse";

export default class SessionUserService {
  async execute({email, password}: ISessionUser): Promise<ISessionResponse> {
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordConfirmation = await compare(password, user.password);
    if (!passwordConfirmation) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const token = sign({},process.env.JWT_SECRET as Secret, {
      subject: String(user.id),
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}
