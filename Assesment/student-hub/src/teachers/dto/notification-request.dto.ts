import { IsEmail, IsNotEmpty } from 'class-validator';

export class NotificationRequestDto {
  @IsNotEmpty()
  @IsEmail()
  teacher: string;
  notification: string;
}
