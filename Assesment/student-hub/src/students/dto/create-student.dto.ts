import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
