import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateTeacherDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
