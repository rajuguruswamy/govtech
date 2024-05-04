import { IsEmail, IsNotEmpty } from 'class-validator';

export class SuspendStudentDto {
  @IsNotEmpty()
  @IsEmail()
  student: string;
}
