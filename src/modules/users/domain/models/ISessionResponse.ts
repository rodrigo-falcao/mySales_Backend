import { User } from "../../infra/database/entities/User";

export interface ISessionResponse {
  user: User;
  token: string;
}
