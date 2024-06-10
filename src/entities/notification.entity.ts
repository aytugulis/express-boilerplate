import { DocumentType, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { AnyKeys, HydratedDocument, Types } from 'mongoose';

import { NotificationAction } from '@/schemas/notification.schema';

import { User } from './user.entity';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
})
export class Notification extends TimeStamps implements Base {
  public _id: Types.ObjectId;

  public id: string;

  @prop({ type: String, required: true })
  public action: NotificationAction;

  @prop({ type: String, required: true })
  public email: string;

  @prop({ type: Boolean, default: false })
  public sent: boolean;

  @prop({ type: Boolean, default: false })
  public completed: boolean;

  @prop({ type: String })
  public token?: string;

  @prop({ type: String })
  public expireDate?: string;

  @prop({ type: String })
  public messageId?: string;

  @prop({ type: String })
  public errorMessage?: string;

  @prop({ ref: () => User })
  user: Ref<User>;
}

export type NotificationBase = Omit<Notification, keyof TimeStamps | keyof Base>;
export type NotificationInput = AnyKeys<DocumentType<Notification>>;
export type NotificationDocument = HydratedDocument<Notification>;
export const NotificationEntity = getModelForClass(Notification);
