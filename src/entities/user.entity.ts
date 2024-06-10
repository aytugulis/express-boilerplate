import { DocumentType, getModelForClass, modelOptions, pre, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import bcrypt from 'bcryptjs';
import { AnyKeys, HydratedDocument, Types } from 'mongoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
})
// eslint-disable-next-line no-use-before-define
@pre<User>('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      next();
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  } catch (error) {
    next(error as Error);
  }
})
export class User extends TimeStamps implements Base {
  public _id: Types.ObjectId;

  public id: string;

  @prop({ type: String, required: true, unique: true })
  public username: string;

  @prop({ type: String, required: true, unique: true })
  public email: string;

  @prop({ type: String, required: true, select: false })
  public password: string;
}

export type UserBase = Omit<User, keyof TimeStamps | keyof Base>;
export type UserInput = AnyKeys<DocumentType<User>>;
export type UserDocument = HydratedDocument<User>;
export const UserEntity = getModelForClass(User);
