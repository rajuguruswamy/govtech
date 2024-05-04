import { IsEmail, IsNotEmpty } from 'class-validator';
export class UpdateStudentDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
