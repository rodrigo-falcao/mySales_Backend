import { AppDataSource } from "@shared/typeorm/data-source";
import UserToken from "../entities/UserToken";


export const usersTokensRepositories = AppDataSource.getRepository(UserToken).extend({
  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.findOneBy({ token });
    return userToken
  },

  async generate(user_id: number): Promise<UserToken | undefined> {
    const userToken = this.create({
      user_id,
    });

    await this.save(userToken);
    return userToken;
  }
})
