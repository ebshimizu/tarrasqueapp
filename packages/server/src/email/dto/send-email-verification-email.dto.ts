import { IsEmail, IsString } from 'class-validator';

export class SendEmailVerificationDto {
  @IsString()
  name: string;

  @IsEmail()
  to: string;

  @IsString()
  token: string;
}
