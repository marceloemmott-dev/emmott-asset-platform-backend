import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { ResendProvider } from './providers/resend.provider';

@Module({
  imports: [ConfigModule],
  providers: [MailService, ResendProvider],
  exports: [MailService, ResendProvider],
})
export class MailModule {}
