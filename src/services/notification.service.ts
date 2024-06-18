import crypto from 'crypto';
import ejs from 'ejs';
import nodemailer from 'nodemailer';

import { NotificationDocument, NotificationEntity } from '@/entities/notification.entity';
import { UserEntity } from '@/entities/user.entity';
import { NotFoundError, UnauthorizedError } from '@/errors/errors';
import { ForgetPasswordBody, notificationAction } from '@/schemas/notification.schema';

const { RESET_PASSWORD_EXPIRE_IN_MIN, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

enum TemplateType {
  FORGET_PASSWORD = 'FORGET_PASSWORD',
}
type EmailInfo = { subject: string; html: string };
type SendEmailParameters = {
  email: string;
  notification: NotificationDocument;
  emailInfo: EmailInfo;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any>;
};

const EMAIL_INFO: Record<TemplateType, EmailInfo> = {
  FORGET_PASSWORD: {
    subject: 'Reset Your Password',
    html: 'forget-password-email.ejs',
  },
};

export const notificationService = {
  async forgetPassword({ email }: ForgetPasswordBody) {
    const user = await UserEntity.findOne({ email });
    if (!user) {
      throw new NotFoundError('There is no user with that email');
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expireDate = Date.now() + parseInt(RESET_PASSWORD_EXPIRE_IN_MIN, 10) * 60000; // 1 min equal 60000 ms

    const notification = await NotificationEntity.create({
      action: notificationAction.Enum.RESET_PASSWORD,
      email,
      token,
      expireDate,
      user,
    });

    await this.sendEmail({
      email,
      notification,
      emailInfo: EMAIL_INFO.FORGET_PASSWORD,
      params: { resetPasswordURL: `http://localhost:5000/api/auth/reset-password?token=${token}` },
    });

    return notification.sent;
  },

  async resetPassword(token: string, password: string) {
    const notification = await NotificationEntity.findOne({ token, expireDate: { $gt: Date.now() } });
    if (!notification) {
      throw new NotFoundError('Invalid token or session expired');
    }

    const user = await UserEntity.findOne({ email: notification.email });
    if (!user) {
      throw new UnauthorizedError('Unauthorized user');
    }

    user.password = password;
    notification.token = undefined;
    notification.expireDate = undefined;
    notification.completed = true;
    await Promise.allSettled([user.save(), notification.save()]);
  },

  async sendEmail({ email, notification, emailInfo, params }: SendEmailParameters) {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    try {
      const emailTemplate = await ejs.renderFile(emailInfo.html, params);

      const info = await transporter.sendMail({
        from: SMTP_USER,
        to: email,
        subject: emailInfo.subject,
        html: emailTemplate,
      });

      notification.sent = true;
      notification.messageId = info.messageId;
    } catch (error) {
      const customError = error as Error;
      console.log('Error occured while sending email', customError?.message);
      notification.sent = false;
      notification.errorMessage = customError?.message || 'Unknown error';
    }

    await notification.save();
  },
};
