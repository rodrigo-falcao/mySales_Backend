import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';


export default class ProfileControllers {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const user_id = Number(request.user!.id);
    const user = await showProfile.execute({ user_id });
    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const user_id = Number(request.user!.id);
    const { name, email, password, oldPassword } = request.body;

    const updateProfile = new UpdateProfileService();;
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      oldPassword,
    });

    return response.json(user);
  }
}
