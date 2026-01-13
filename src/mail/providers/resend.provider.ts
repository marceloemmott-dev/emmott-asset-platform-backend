import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class ResendProvider {
  private readonly client: Resend;
  private readonly mailFrom: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.client = new Resend(apiKey);
    this.mailFrom = this.configService.get<string>(
      'MAIL_FROM',
      'onboarding@resend.dev',
    );
  }

  async sendEmail(options: { to: string; subject: string; html: string }) {
    return this.client.emails.send({
      from: this.mailFrom,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }
}
