import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UpdateProfileUserService from '@modules/users/services/UpdateProfileUserService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

import { container } from 'tsyringe';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateProfile = container.resolve(UpdateProfileUserService);

    const user = await updateProfile.execute({
      name,
      email,
      password,
      user_id,
      old_password,
    });
    delete user.password;
    return response.json(classToClass(user));
  }
}
