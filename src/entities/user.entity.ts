import { DocumentType, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { AnyKeys, HydratedDocument, Types } from 'mongoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
})
export class User extends TimeStamps implements Base {
  public _id: Types.ObjectId;

  public id: string;

  @prop({ required: true, unique: true })
  public username: string;

  @prop({ required: true, select: false })
  public password: string;
}

export type UserBase = Omit<User, keyof TimeStamps | keyof Base>;
export type UserInput = AnyKeys<DocumentType<User>>;
export type UserDocument = HydratedDocument<User>;
export const UserModel = getModelForClass(User);
