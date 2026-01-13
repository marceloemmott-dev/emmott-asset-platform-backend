import { Injectable } from '@nestjs/common';
import { ResendProvider } from './providers/resend.provider';
import { resetPasswordTemplate } from './templates/reset-password';
import { passwordChangedTemplate } from './templates/password-changed';
import { welcomeTemplate } from './templates/welcome';

@Injectable()
export class MailService {
  constructor(private readonly resend: ResendProvider) {}

  async sendResetPasswordEmail(email: string, name: string, token: string) {
    return this.resend.sendEmail({
      to: email,
      subject: 'Reset your password - Emmott Asset Platform',
      html: resetPasswordTemplate(name, token),
    });
  }

  async sendPasswordChangedEmail(email: string, name: string) {
    return this.resend.sendEmail({
      to: email,
      subject: 'Password Changed Successfully - Emmott Asset Platform',
      html: passwordChangedTemplate(name),
    });
  }

  async sendWelcomeEmail(email: string, name: string) {
    return this.resend.sendEmail({
      to: email,
      subject: 'Welcome to Emmott Asset Platform',
      html: welcomeTemplate(name),
    });
  }
}
