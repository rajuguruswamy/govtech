import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterStudentsToTeachertDto {
  @IsNotEmpty()
  @IsEmail()
  teacherEmail: string;

  @IsNotEmpty()
  @IsEmail()
  @IsArray()
  @ArrayMinSize(1)
  studentEmails: string[];
}
