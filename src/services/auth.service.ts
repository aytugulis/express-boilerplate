import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserDocument, UserEntity } from '@/entities/user.entity';
import { ChangePasswordBody, LoginBody, RegisterBody } from '@/schemas/auth.schema';
import { BadRequestError, NotFoundError, UnauthorizedError } from '@/errors/errors';
import { Payload } from '@/types/authentication.type';

const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
if (!JWT_SECRET_KEY || !JWT_EXPIRE) {
  throw new Error('⛔ Missing JWT credentials');
}

export const authService = {
  async register(data: RegisterBody) {
    const user = await UserEntity.create(data);
    return this.generateToken(user);
  },

  async login(data: LoginBody) {
    const user = await UserEntity.findOne({ username: data.username }).select('password');
    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    return this.generateToken(user);
  },

  async changePassword({ oldPassword, newPassword }: ChangePasswordBody, id?: string) {
    if (oldPassword === newPassword) {
      throw new BadRequestError('New password cannot be the same as your old password');
    }

    const user = await UserEntity.findById(id).select('password');
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Wrong old password');
    }

    user.password = newPassword;
    await user.save();
  },

  generateToken(user: UserDocument) {
    const payload: Payload = { id: user.id, username: user.username, email: user.email };

    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });
  },
};
