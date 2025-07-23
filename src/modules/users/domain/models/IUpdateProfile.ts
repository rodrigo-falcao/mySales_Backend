export interface IUpdateProfile {
  user_id: number;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}
