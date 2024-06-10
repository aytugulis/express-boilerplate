import { UserEntity } from '@/entities/user.entity';
import { NotFoundError } from '@/errors/errors';

export const userService = {
  async getUser(id: string) {
    const user = await UserEntity.findById(id);
    if (!user) {
      throw new NotFoundError('There is no user with that id');
    }

    return user;
  },
};
