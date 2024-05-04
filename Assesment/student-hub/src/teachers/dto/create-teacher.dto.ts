import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateTeacherDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
